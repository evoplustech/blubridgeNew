"""Operator-only credential rotation. Values are read from the private server .env."""
import os
import sys
import uuid
from datetime import datetime, timezone
from pathlib import Path

import bcrypt
from dotenv import dotenv_values
from pymongo import MongoClient


def main():
    if '--confirm-rotation' not in sys.argv:
        raise SystemExit('Explicit --confirm-rotation is required; verify a rollback snapshot first.')
    config = Path(__file__).resolve().parents[1] / '.env'
    values = dotenv_values(config)
    username, password = values['ADMIN_USERNAME'], values['ADMIN_PASSWORD']
    if len(password) < 20 or len(password.encode()) > 72:
        raise SystemExit('Configure a strong operator password first.')
    client = MongoClient(values['MONGO_URL'])
    db = client[values['DB_NAME']]
    existing = db.admin_settings.find_one({'type': 'credentials', 'username': username})
    if not existing:
        raise SystemExit('Existing administrator not found; no account has been created or overwritten.')
    auth_id = existing.get('auth_id') or str(uuid.uuid4())
    result = db.admin_settings.update_one({'_id': existing['_id'], 'passwordHash': existing['passwordHash']}, {'$set': {
        'passwordHash': bcrypt.hashpw(password.encode(), bcrypt.gensalt(rounds=12)).decode(),
        'auth_id': auth_id, 'auth_version': existing.get('auth_version', 0) + 1,
        'role': 'admin', 'updatedAt': datetime.now(timezone.utc).isoformat(),
    }})
    if result.modified_count != 1:
        raise SystemExit('Concurrent credential update detected; rotation stopped.')
    db.admin_sessions.delete_many({'user_id': auth_id})
    db.security_events.insert_one({'id': str(uuid.uuid4()), 'event': 'operator_credential_rotation', 'actor': auth_id, 'created_at': datetime.now(timezone.utc)})
    os.chmod(config, 0o600)
    client.close()
    print('Administrator credential rotated; previous sessions revoked. No credential values printed.')


if __name__ == '__main__':
    main()