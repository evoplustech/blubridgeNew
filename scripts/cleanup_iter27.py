from pymongo import MongoClient


def read_env(path, key):
    with open(path, "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if line.startswith(f"{key}="):
                return line.split("=", 1)[1].strip().strip('"')
    return ""


def main():
    mongo_url = read_env("/app/backend/.env", "MONGO_URL")
    db_name = read_env("/app/backend/.env", "DB_NAME")
    if not mongo_url or not db_name:
        print("Missing Mongo settings")
        return

    client = MongoClient(mongo_url)
    db = client[db_name]

    query = {
        "$or": [
            {"company_email": {"$regex": r"^qa\.it27\.", "$options": "i"}},
            {"company_email": {"$regex": r"^qa\.ui\.it27\.", "$options": "i"}},
            {"company_email": {"$regex": r"^qa\.admin\.it27\.", "$options": "i"}},
            {"company_email": {"$regex": r"^qa\.ai\.smoke\.", "$options": "i"}},
            {"full_name": "QA AI Complete Submission"},
        ]
    }

    result = db.contact_enquiries.delete_many(query)
    print(f"Deleted {result.deleted_count} QA records from contact_enquiries")
    projects = db.project_enquiries.delete_many({"email": {"$regex": r"^qa\.it27\.project\.", "$options": "i"}})
    print(f"Deleted {projects.deleted_count} QA regression records from project_enquiries")
    client.close()


if __name__ == "__main__":
    main()
