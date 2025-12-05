require('dotenv').config();
const { MongoClient } = require('mongodb');

async function setupCollections() {
  const uri = process.env.MONGO_URI;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db("AgentChecklistDB");
    console.log("Connected to MongoDB");

    // Create needed collections
    await db.createCollection("users");
    await db.createCollection("checklistItems");
    await db.createCollection("notifications");

    console.log("Collections created successfully.");
  } catch (err) {
    console.error("Error creating collections:", err);
  } finally {
    await client.close();
  }
}

setupCollections();
