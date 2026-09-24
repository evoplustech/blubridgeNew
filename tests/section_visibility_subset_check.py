import json
import os
import re
import xml.etree.ElementTree as ET
from pathlib import Path

import requests


def load_frontend_env_url() -> str:
    env_path = Path("/app/frontend/.env")
    base_url = None
    for line in env_path.read_text().splitlines():
        if line.startswith("REACT_APP_BACKEND_URL="):
            base_url = line.split("=", 1)[1].strip().strip("'\"")
            break
    if not base_url:
        raise RuntimeError("REACT_APP_BACKEND_URL not found in /app/frontend/.env")
    return base_url.rstrip("/")


def normalize_path(url_or_path: str) -> str:
    path = re.sub(r"https?://[^/]+", "", url_or_path)
    path = path.split("#", 1)[0]
    path = path if path else "/"
    if len(path) > 1 and path.endswith("/"):
        path = path[:-1]
    return path


def check_status(session: requests.Session, base: str, path: str, expected: int):
    resp = session.get(f"{base}{path}", allow_redirects=False, timeout=20)
    return {
        "path": path,
        "expected": expected,
        "status": resp.status_code,
        "pass": resp.status_code == expected,
        "location": resp.headers.get("Location"),
    }


def main():
    base = load_frontend_env_url()
    session = requests.Session()

    checks = []

    # Required public routes
    for path in ["/products", "/products/", "/solutions", "/solutions/", "/consulting"]:
        checks.append(check_status(session, base, path, 200))

    # Hidden product/solution/industry detail routes including aliases
    hidden_404_paths = [
        "/products/training",
        "/products/training/",
        "/PRODUCTS/TRAINING/",
        "/solutions/model-customization",
        "/solutions/deployment",
        "/solutions/industry/healthcare",
        "/solutions/industry/healthcare/",
        "/SOLUTIONS/INDUSTRY/HEALTHCARE/",
    ]
    for path in hidden_404_paths:
        checks.append(check_status(session, base, path, 404))

    # Unknown and pre-excluded paths
    for path in ["/some-unknown-path", "/media-kit", "/get-in-touch-8", "/contact/sales"]:
        checks.append(check_status(session, base, path, 404))

    # Legacy redirect
    ai_consulting = check_status(session, base, "/ai-consulting", 308)
    checks.append(ai_consulting)

    redirect_ok = False
    if ai_consulting["status"] == 308 and ai_consulting.get("location"):
        redirect_ok = normalize_path(ai_consulting["location"]) == "/consulting"

    # noindex check on representative hidden route
    hidden_resp = session.get(f"{base}/products/training", allow_redirects=False, timeout=20)
    hidden_html = hidden_resp.text.lower()
    x_robots = hidden_resp.headers.get("X-Robots-Tag", "").lower()
    noindex_present = ("noindex" in x_robots) or ("noindex" in hidden_html)

    # Sitemap checks
    sitemap_resp = session.get(f"{base}/sitemap.xml", timeout=20)
    sitemap_resp.raise_for_status()
    root = ET.fromstring(sitemap_resp.text)
    ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    locs = [loc.text for loc in root.findall("sm:url/sm:loc", ns) if loc.text]
    sitemap_paths = [normalize_path(loc) for loc in locs]

    has_admin = any(path.startswith("/admin") for path in sitemap_paths)
    has_product_detail = any(path.startswith("/products/") for path in sitemap_paths)
    has_solution_detail = any(path.startswith("/solutions/") for path in sitemap_paths)
    has_industry = any(path.startswith("/solutions/industry/") for path in sitemap_paths)

    # JSON/catalog alignment and unchanged groups validation
    current_routes = json.loads(Path("/app/frontend/src/routing/publishedPages.json").read_text())
    before_routes = json.loads(Path("/tmp/section-routes-before.json").read_text())

    current_public_count = len(list(dict.fromkeys(sum(current_routes["public"].values(), []))))

    unchanged_groups = ["Home", "Company", "Job details", "Research", "Contact", "Consulting", "Policies"]
    unchanged_results = {}
    for group in unchanged_groups:
        unchanged_results[group] = current_routes["public"].get(group) == before_routes["public"].get(group)

    admin_unchanged = current_routes.get("admin") == before_routes.get("admin")

    summary = {
        "base_url": base,
        "http_checks": checks,
        "all_http_checks_pass": all(item["pass"] for item in checks),
        "redirect_check": {
            "path": "/ai-consulting",
            "expected_status": 308,
            "expected_location_path": "/consulting",
            "pass": redirect_ok,
            "actual_location": ai_consulting.get("location"),
        },
        "noindex_check_hidden_route": {
            "path": "/products/training",
            "status": hidden_resp.status_code,
            "x_robots_tag": hidden_resp.headers.get("X-Robots-Tag"),
            "pass": noindex_present,
        },
        "sitemap": {
            "status": sitemap_resp.status_code,
            "url_count": len(sitemap_paths),
            "expected_url_count": 22,
            "count_pass": len(sitemap_paths) == 22,
            "has_admin": has_admin,
            "has_product_detail": has_product_detail,
            "has_solution_detail": has_solution_detail,
            "has_industry": has_industry,
            "exclusion_pass": not any([has_admin, has_product_detail, has_solution_detail, has_industry]),
        },
        "catalog": {
            "current_public_count": current_public_count,
            "expected_public_count": 22,
            "count_pass": current_public_count == 22,
            "admin_unchanged": admin_unchanged,
            "unchanged_groups": unchanged_results,
            "all_unchanged_groups_pass": all(unchanged_results.values()),
        },
    }

    out_path = Path("/app/test_reports/section_visibility_subset_verification.json")
    out_path.write_text(json.dumps(summary, indent=2))
    print(f"Wrote {out_path}")


if __name__ == "__main__":
    main()
