require('dotenv').config();
const { MongoClient } = require('mongodb');

async function insertSampleData() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error("MONGO_URI not found in .env");
    return;
  }

  const client = new MongoClient(uri);

  try {
    // Connect to MongoDB
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db("AgentChecklistDB"); // <-- define db here

    // -----------------------------
    // Sample Data Insertion
    // -----------------------------

    await db.collection("users").insertMany([
      {
        userId: 1,
        name: "Mariam Tarek",
        email: "mariam.t@example.com",
        checklists: [
          {
            checklistId: 101,
            title: "Daily Sales Tasks",
            status: "In Progress",
            tasks: [
              { taskId: 1001, title: "Call 5 clients" },
              { taskId: 1002, title: "Update CRM" }
            ]
          }
        ]
      },
      {
        userId: 2,
        name: "Kerolos Bassem",
        email: "kerolos.b@example.com",
        checklists: [
          {
            checklistId: 102,
            title: "Inventory Check",
            status: "Pending",
            tasks: [
              { taskId: 2001, title: "Count stock in warehouse" }
            ]
          }
        ]
      }
    ]);

    await db.collection("checklistItems").insertMany([
      { itemId: 1, taskId: 1001, title: "Call Client A", status: "Pending" },
      { itemId: 2, taskId: 1001, title: "Call Client B", status: "Pending" },
      { itemId: 3, taskId: 1002, title: "Update CRM with new leads", status: "Completed" }
    ]);

    await db.collection("notifications").insertMany([
      { notificationId: 1, userId: 1, status: "unread", message: "You have 2 pending tasks today" },
      { notificationId: 2, userId: 2, status: "read", message: "Inventory check due tomorrow" }
    ]);

    await db.collection("reports").insertMany([
      { reportId: 1, checklistId: 101, progressPercent: 50, date: new Date("2025-12-01") },
      { reportId: 2, checklistId: 102, progressPercent: 0, date: new Date("2025-12-02") }
    ]);

    console.log("Sample data inserted successfully.");
  } catch (err) {
    console.error("Error inserting sample data:", err);
  } finally {
    await client.close();
    console.log("MongoDB connection closed");
  }
}

// Run the insertion
insertSampleData();
