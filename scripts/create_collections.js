

db = db.getSiblingDB("AgentChecklistDB");

// 01_create_collections.js



// Create main collections
db.createCollection("users");
db.createCollection("checklistItems"); 
db.createCollection("notifications");

print("Collections created successfully (users, checklistItems, notifications).");
