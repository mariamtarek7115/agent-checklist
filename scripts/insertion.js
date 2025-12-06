require("dotenv").config();
const { MongoClient, Int32 } = require("mongodb");

async function insertSampleData() {
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

    

    await db.collection("users").insertMany([
      {
        userId: new Int32(1),
        name: "Mariam Tarek",
        email: "mariam.t@example.com",
        password: "mariam123",                  
        checklists: [
          {
            checklistId: new Int32(101),
            title: "Daily Sales Tasks",
            description: "Daily tasks for following up with clients and updating CRM.",
            status: "In Progress",
            report: {
              progressPercent: new Int32(50),
              date: new Date("2025-12-01")
            },
            tasks: [
              {
                taskId: new Int32(1001),
                title: "Call 5 clients",
                signOff: { timestamp: new Date("2025-12-01T10:00:00Z") }
              },
              {
                taskId: new Int32(1002),
                title: "Update CRM",
                signOff: { timestamp: new Date("2025-12-01T11:00:00Z") }
              }
            ]
          }
        ]
      },

      {
        userId: new Int32(2),
        name: "Kerolos Bassem",
        email: "kerolos.b@example.com",
        password: "kerolos123",                
        checklists: [
          {
            checklistId: new Int32(102),
            title: "Inventory Check",
            description: "Checklist for weekly warehouse inventory review.",
            status: "Pending",
            report: {
              progressPercent: new Int32(0),
              date: new Date("2025-12-02")
            },
            tasks: [
              {
                taskId: new Int32(2001),
                title: "Count stock in warehouse",
                signOff: { timestamp: new Date("2025-12-02T09:00:00Z") }
              }
            ]
          }
        ]
      }

      
    ]);

    
    // CHECKLIST ITEMS
   
    await db.collection("checklistItems").insertMany([
      {
        itemId: new Int32(1),
        taskId: new Int32(1001),
        title: "Call Client A",
        status: "Pending"
      },
      {
        itemId: new Int32(2),
        taskId: new Int32(1001),
        title: "Call Client B",
        status: "Pending"
      },
      {
        itemId: new Int32(3),
        taskId: new Int32(1002),
        title: "Update CRM with new leads",
        status: "Completed"
      }
    ]);

   
    // NOTIFICATIONS
   
    await db.collection("notifications").insertMany([
      {
        notificationId: new Int32(1),
        userId: new Int32(1),
        status: "unread",
        message: "You have 2 pending tasks today"
      },
      {
        notificationId: new Int32(2),
        userId: new Int32(2),
        status: "read",
        message: "Inventory check due tomorrow"
      }
    ]);

    console.log("Sample data inserted successfully.");
  } catch (err) {
    console.error("Error inserting sample data:", err);
  } finally {
    await client.close();
    console.log("MongoDB connection closed");
  }
}

insertSampleData();
