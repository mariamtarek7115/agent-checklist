require('dotenv').config();
const { MongoClient } = require('mongodb');

async function runCRUDOperations() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error("MONGO_URI not found in .env");
    return;
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db("AgentChecklistDB");

    // -----------------------------
    // 1️⃣ READ example
    // -----------------------------
    const usersInProgress = await db.collection("users").find({ "checklists.status": "In Progress" }).toArray();
    console.log("Read: Users with In Progress checklists:", usersInProgress);

    // -----------------------------
    // 2️⃣ UPDATE example
    // -----------------------------
    const updateResult = await db.collection("users").updateOne(
      { "checklists.checklistId": 101 },
      { $set: { "checklists.$.status": "Completed" } }
    );
    console.log(`Update: Modified ${updateResult.modifiedCount} checklist(s).`);

    // -----------------------------
    // 3️⃣ DELETE example
    // -----------------------------
    const deleteResult = await db.collection("users").deleteOne({ userId: 2 });
    console.log(`Delete: Deleted ${deleteResult.deletedCount} user(s).`);

    // -----------------------------
    // 4️⃣ INSERT example (new user)
    // -----------------------------
    const insertResult = await db.collection("users").insertOne({
      userId: 3,
      name: "Toka ElSayed",
      email: "toka.e@example.com",
      checklists: [
        { checklistId: 103, title: "Monthly Reports", status: "Pending", tasks: [{ taskId: 3001, title: "Prepare report" }] }
      ]
    });
    console.log("Insert: Added new user:", insertResult.insertedId);

  } catch (err) {
    console.error("Error in CRUD operations:", err);
  } finally {
    await client.close();
    console.log("MongoDB connection closed");
  }
}

// Run the CRUD operations
runCRUDOperations();
