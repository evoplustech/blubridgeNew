# BluBridge backup and rollback verification

Status: **backup restoration verified before hardening edits**. Security work is not complete.

## Protected rollback material
- Private location: `/root/blubridge-security-backups/20260922T140355Z/`, outside application/static directories, restricted to the server operator.
- Application archive: AES-256-GCM encrypted snapshot of the complete `/app` tree, including repository history, configuration, assets, installed frontend dependencies and untracked files.
- Database archive: AES-256-GCM encrypted logical dump of the configured application database. It includes existing documents, indexes and collection options.
- Existing source-control checkpoint retained and restored: `97fbaaa6b14dc53e0f927745580849ced26cc822`. Tracked files matched that checkpoint before backup; untracked runtime/test/lock files are additionally preserved in the full application archive.
- Runtime configuration archive and installed Python dependency inventory retained privately.
- The recovery key is held only in the restricted backup directory. It is intentionally excluded from this report, public routes, screenshots and repository documentation. Do not copy it into chat, issue trackers or source control.

## Tests actually performed
1. Authenticated-decrypted application archive into a separate filesystem directory.
2. Compared every restored file's SHA-256, permissions, directories and symbolic-link targets with the source manifest.
3. Confirmed the restored repository points to the retained checkpoint.
4. Compared database BSON fingerprints, counts, indexes and collection options before and after the dump; the source remained stable during the backup.
5. Authenticated-decrypted and restored the database into a randomly named, separate namespace, never over the live database.
6. Compared the restored database's documents, indexes and collection options with the original fingerprint.
7. Confirmed the original database was unchanged and removed only the isolated verification namespace.

Evidence: the restricted directory contains `backup-report.safe.json`, encrypted archive hashes and private manifests. The initial restore attempt was rejected by a provider-specific temporary database-name length limit; a new shorter namespace restored successfully. No live data was overwritten in either attempt.

## Rollback procedure
1. Obtain operator access to the restricted backup directory and review the safe verification report. Verify the encrypted archive SHA-256 values before proceeding.
2. Preserve a **fresh** backup of the current state first. Pause administrative writes and submissions only within an explicitly approved maintenance window; do not silently discard submissions received after the baseline backup.
3. Use the AES-GCM format/decryption routine in `/root/blubridge-security-backups/verify_backup.py` with the private recovery configuration. Authentication must succeed before trusting decrypted material. Never print the recovery key or connection URI.
4. Extract the application to a new isolated directory, verify its manifest and checkpoint again, and restore only the intended application/configuration files. Prefer a code-only rollback when no data repair is required.
5. Restore the database archive into a **new temporary namespace**, not the current database. Verify its manifest. A full overwrite of current data is prohibited without explicit owner approval and reconciliation of newer legitimate records. Prefer additive, record-specific recovery where feasible.
6. Reinstall the pinned Python dependencies if necessary and use the preserved frontend dependency tree/lockfile. Preserve environment-specific connection settings and service ports. Restart only the existing supervisor-managed services when configuration/dependencies require it.
7. Run the build, authentication, public enquiry/footer submission, authorized admin CRUD/export and data-integrity regression tests before returning service to users.
8. The baseline contains known security weaknesses. Do not expose a restored baseline publicly until its administrator credentials and access controls are secured again.

## Limits and pre-existing conditions
- This verifies restoration **within the current connected environment**. The snapshots and recovery key are not yet stored in separate durable/offsite custody. Loss of this entire environment would require an independently retained encrypted copy and recovery key. External backup retention and disaster recovery cannot be claimed as configured.
- Some existing job-application records reference résumé files already absent from the available filesystem. Present files and all references were preserved; a snapshot cannot recreate previously missing files. No source data or résumé was deleted during backup verification.
- The private filesystem restore and isolated database namespace were removed after successful comparison; encrypted rollback artifacts remain available.