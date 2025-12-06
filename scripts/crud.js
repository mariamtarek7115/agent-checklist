require("dotenv").config();
const { MongoClient, Int32 } = require("mongodb");



async function runCRUDOperations() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error("MONGO_URI not found in .env");
    return;
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");

    const db = client.db("AgentChecklistDB");

    
    const usersInProgress = await db
      .collection("users")
      .find({ "checklists.status": "In Progress" })
      .toArray();

    console.log(" Read: Users with In Progress checklists:");
    console.dir(usersInProgress, { depth: null });

    
    // Set checklist 101 status to "Completed"

    const updateResult = await db.collection("users").updateOne(
      { "checklists.checklistId": new Int32(101) },
      { $set: { "checklists.$.status": "Completed" } }
    );
    console.log(` Update: Modified ${updateResult.modifiedCount} checklist(s).`);

    
    
    // Delete user with userId = 2
    
    const deleteResult = await db
      .collection("users")
      .deleteOne({ userId: new Int32(2) });

    console.log(` Delete: Deleted ${deleteResult.deletedCount} user(s).`);

   
    
  
    const insertResult = await db.collection("users").insertOne({
      userId: new Int32(9),
      name: "Toka ElSayed",
      email: "toka.e@example.com",
      password: "toka123",
      checklists: [
        {
          checklistId: new Int32(109),
          title: "Monthly Reports",
          description: "Prepare and review monthly performance reports.",
          status: "Pending",
          report: {
            progressPercent: new Int32(0),
            date: new Date("2025-12-10")
          },
          tasks: [
            {
              taskId: new Int32(9001),
              title: "Collect sales data",
              signOff: { timestamp: new Date("2025-12-10T09:00:00Z") }
            },
            {
              taskId: new Int32(9002),
              title: "Generate summary report",
              signOff: { timestamp: new Date("2025-12-10T10:00:00Z") }
            }
          ]
        }
      ]
    });

    console.log(" Insert: Added new user with _id:", insertResult.insertedId);

  } catch (err) {
    console.error("❌ Error in CRUD operations:", err);
  } finally {
    await client.close();
    console.log("🔌 MongoDB connection closed");
  }
}


runCRUDOperations();
