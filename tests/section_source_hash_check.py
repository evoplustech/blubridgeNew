import hashlib
import json
from pathlib import Path


def sha256_file(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as f:
        for chunk in iter(lambda: f.read(1024 * 1024), b""):
            h.update(chunk)
    return h.hexdigest()


def main():
    snapshot_path = Path("/tmp/section-source-protected.json")
    snapshot = json.loads(snapshot_path.read_text())

    missing = []
    mismatched = []
    matched = 0

    for raw_path, expected_hash in snapshot.items():
        file_path = Path(raw_path)
        if not file_path.exists():
            missing.append(raw_path)
            continue
        actual_hash = sha256_file(file_path)
        if actual_hash != expected_hash:
            mismatched.append(
                {
                    "path": raw_path,
                    "expected": expected_hash,
                    "actual": actual_hash,
                }
            )
        else:
            matched += 1

    report = {
        "snapshot_file": str(snapshot_path),
        "total_files": len(snapshot),
        "matched": matched,
        "missing_count": len(missing),
        "mismatch_count": len(mismatched),
        "missing": missing,
        "mismatched": mismatched,
    }

    out_path = Path("/app/test_reports/section_source_hash_check.json")
    out_path.write_text(json.dumps(report, indent=2))
    print(f"Wrote {out_path}")


if __name__ == "__main__":
    main()
