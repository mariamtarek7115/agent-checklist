require("dotenv").config();
const { MongoClient } = require("mongodb");

async function createIndexes() {
  const uri = process.env.MONGO_URI;
  if (!uri) return console.error("❌ Missing MONGO_URI in .env");

  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("✅ Connected to MongoDB for index creation");

    const db = client.db("AgentChecklistDB");

    // USERS — for fast login
    await db.collection("users").createIndex({ email: 1 });

    // CHECKLIST ITEMS — each item has ID
    await db.collection("checklistItems").createIndex({ checklistItemId: 1 });

    // NOTIFICATIONS — lookup by user
    await db.collection("notifications").createIndex({ userId: 1, status: 1 });

    console.log("✅ Indexes created successfully");

  } catch (err) {
    console.error("❌ Error creating indexes:", err);
  } finally {
    await client.close();
    console.log("🔌 MongoDB connection closed");
  }
}

createIndexes();
