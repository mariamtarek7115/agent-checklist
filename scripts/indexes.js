db = db.getSiblingDB("AgentChecklistDB");




// 03_indexes.js



// USERS: Optional index on email for login
db.users.createIndex({ email: 1 });

// NOTIFICATIONS: Frequently searched by userId and status
db.notifications.createIndex({ userId: 1, status: 1 });

// CHECKLIST ITEMS: Reference by taskId
db.checklistItems.createIndex({ taskId: 1 });

print("Indexes created successfully.");

