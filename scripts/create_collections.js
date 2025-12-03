

db = db.getSiblingDB("AgentChecklistDB");

db.createCollection("users");
db.createCollection("checklistItems");
db.createCollection("notifications");
db.createCollection("reports");

print("Collections created successfully.");
