require("dotenv").config();
const { MongoClient } = require("mongodb");

async function createCollections() {
  const uri = process.env.MONGO_URI;
  if (!uri) return console.error("❌ Missing MONGO_URI in .env");

  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");

    const db = client.db("AgentChecklistDB");

    // Only 3 collections (reports embedded → NOT separate)
    await db.createCollection("users");
    await db.createCollection("checklistItems");
    await db.createCollection("notifications");

    console.log("✅ Collections created: users, checklistItems, notifications");

  } catch (err) {
    console.error("❌ Error creating collections:", err);
  } finally {
    await client.close();
    console.log("🔌 MongoDB connection closed");
  }
}

createCollections();
