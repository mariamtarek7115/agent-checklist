db = db.getSiblingDB("AgentChecklistDB");




db.users.createIndex({ userId: 1 });
db.notifications.createIndex({ userId: 1, status: 1 });
db.checklistItems.createIndex({ taskId: 1 });

print("Indexes created successfully.");
