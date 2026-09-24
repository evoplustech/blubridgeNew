import json
from pathlib import Path

import requests


def load_base_url() -> str:
    for line in Path('/app/frontend/.env').read_text().splitlines():
        if line.startswith('REACT_APP_BACKEND_URL='):
            return line.split('=', 1)[1].strip().strip("'\"").rstrip('/')
    raise RuntimeError('REACT_APP_BACKEND_URL missing in /app/frontend/.env')


def normalize(path: str) -> str:
    if len(path) > 1 and path.endswith('/'):
        return path[:-1]
    return path


def main():
    base = load_base_url()
    pages = json.loads(Path('/app/frontend/src/routing/publishedPages.json').read_text())
    public_paths = []
    for group in pages['public'].values():
        for p in group:
            np = normalize(p)
            if np not in public_paths:
                public_paths.append(np)

    session = requests.Session()
    flagged = []
    details = []

    for path in public_paths:
        resp = session.get(f"{base}{path}", timeout=20)
        html = resp.text
        has_home_fallback_marker = 'Beyond the Horizon' in html
        details.append({
            'path': path,
            'status': resp.status_code,
            'home_fallback_marker': has_home_fallback_marker,
            'title_snippet': html.split('<title>', 1)[1].split('</title>', 1)[0] if '<title>' in html and '</title>' in html else None,
        })
        if path != '/' and has_home_fallback_marker:
            flagged.append(path)

    report = {
        'base_url': base,
        'route_count': len(public_paths),
        'flagged_routes_with_home_marker': flagged,
        'pass': len(flagged) == 0,
        'details': details,
    }

    out = Path('/app/test_reports/public_routes_home_fallback_check.json')
    out.write_text(json.dumps(report, indent=2))
    print(f'Wrote {out}')


if __name__ == '__main__':
    main()
