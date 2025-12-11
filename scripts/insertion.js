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

    // -------------------------
    // USERS (extended)
    // -------------------------
    await db.collection("users").insertMany([
      // USER 1
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

      // USER 2
      {
        userId: new Int32(2),
        name: "Kerolos Bassem",
        email: "kerolos.b@example.com",
        password: "kerolos123",
        checklists: [
          {
            checklistId: new Int32(102),
            title: "Inventory Check",
            description: "Weekly warehouse inventory review.",
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
      },

      // USER 3
      {
        userId: new Int32(3),
        name: "Salma Ahmed",
        email: "salma.a@example.com",
        password: "salma123",
        checklists: [
          {
            checklistId: new Int32(103),
            title: "Customer Support Checklist",
            description: "Tasks for customer support calls.",
            status: "Completed",
            report: {
              progressPercent: new Int32(100),
              date: new Date("2025-11-28")
            },
            tasks: [
              {
                taskId: new Int32(3001),
                title: "Respond to support emails",
                signOff: { timestamp: new Date("2025-11-28T08:45:00Z") }
              },
              {
                taskId: new Int32(3002),
                title: "Resolve open tickets",
                signOff: { timestamp: new Date("2025-11-28T10:15:00Z") }
              }
            ]
          }
        ]
      },

      // USER 4
      {
        userId: new Int32(4),
        name: "Omar Youssef",
        email: "omar.y@example.com",
        password: "omar123",
        checklists: [
          {
            checklistId: new Int32(104),
            title: "Marketing Campaign Prep",
            description: "Prepare marketing materials.",
            status: "In Progress",
            report: {
              progressPercent: new Int32(40),
              date: new Date("2025-11-30")
            },
            tasks: [
              {
                taskId: new Int32(4001),
                title: "Write campaign brief",
                signOff: { timestamp: new Date("2025-11-30T09:20:00Z") }
              }
            ]
          }
        ]
      },

      // USER 5
      {
        userId: new Int32(5),
        name: "Lina Mohamed",
        email: "lina.m@example.com",
        password: "lina123",
        checklists: [
          {
            checklistId: new Int32(105),
            title: "Team Coordination",
            description: "Daily team coordination checklist.",
            status: "Pending",
            report: {
              progressPercent: new Int32(20),
              date: new Date("2025-12-03")
            },
            tasks: [
              {
                taskId: new Int32(5001),
                title: "Schedule meetings",
                signOff: { timestamp: new Date("2025-12-03T08:00:00Z") }
              }
            ]
          }
        ]
      },

      // USER 6
      {
        userId: new Int32(6),
        name: "Mostafa Ali",
        email: "mostafa.a@example.com",
        password: "mostafa123",
        checklists: [
          {
            checklistId: new Int32(106),
            title: "Technical QA",
            description: "Quality assurance test tasks.",
            status: "In Progress",
            report: {
              progressPercent: new Int32(75),
              date: new Date("2025-11-29")
            },
            tasks: [
              {
                taskId: new Int32(6001),
                title: "Check system performance",
                signOff: { timestamp: new Date("2025-11-29T09:00:00Z") }
              }
            ]
          }
        ]
      },

      // USER 7
      {
        userId: new Int32(7),
        name: "Nour Khaled",
        email: "nour.k@example.com",
        password: "nour123",
        checklists: [
          {
            checklistId: new Int32(107),
            title: "Data Entry Tasks",
            description: "Operators daily data entry tasks.",
            status: "Completed",
            report: {
              progressPercent: new Int32(100),
              date: new Date("2025-11-26")
            },
            tasks: [
              {
                taskId: new Int32(7001),
                title: "Enter customer data",
                signOff: { timestamp: new Date("2025-11-26T11:00:00Z") }
              }
            ]
          }
        ]
      },

      // USER 8
      {
        userId: new Int32(8),
        name: "Hana Ibrahim",
        email: "hana.i@example.com",
        password: "hana123",
        checklists: [
          {
            checklistId: new Int32(108),
            title: "Financial Review",
            description: "Daily financial review tasks.",
            status: "Pending",
            report: {
              progressPercent: new Int32(10),
              date: new Date("2025-12-04")
            },
            tasks: [
              {
                taskId: new Int32(8001),
                title: "Review expense sheets",
                signOff: { timestamp: new Date("2025-12-04T10:00:00Z") }
              }
            ]
          }
        ]
      }
    ]);

    // -------------------------
    // CHECKLIST ITEMS (extended)
    // -------------------------
    await db.collection("checklistItems").insertMany([
      { itemId: new Int32(4), taskId: new Int32(2001), title: "Check aisle A", status: "Pending" },
      { itemId: new Int32(5), taskId: new Int32(3001), title: "Reply to urgent emails", status: "Completed" },
      { itemId: new Int32(6), taskId: new Int32(4001), title: "Review content draft", status: "Pending" },
      { itemId: new Int32(7), taskId: new Int32(5001), title: "Send team reminders", status: "Pending" },
      { itemId: new Int32(8), taskId: new Int32(6001), title: "Stress test module A", status: "Completed" },
      { itemId: new Int32(9), taskId: new Int32(7001), title: "Verify customer IDs", status: "Pending" },
      { itemId: new Int32(10), taskId: new Int32(8001), title: "Analyze budget", status: "Pending" }
    ]);

    // -------------------------
    // NOTIFICATIONS (extended)
    // -------------------------
   // -------------------------
// NOTIFICATIONS (extended per user)
// -------------------------
await db.collection("notifications").insertMany([
  // USER 1 (Mariam)
  { notificationId: new Int32(1), userId: new Int32(1), status: "unread", message: "You have 2 pending tasks today" },
  { notificationId: new Int32(11), userId: new Int32(1), status: "read",   message: "CRM update completed" },
  { notificationId: new Int32(12), userId: new Int32(1), status: "unread", message: "Client follow-up required" },

  // USER 2 (Kerolos)
  { notificationId: new Int32(2), userId: new Int32(2), status: "read",    message: "Inventory check due tomorrow" },
  { notificationId: new Int32(21), userId: new Int32(2), status: "unread", message: "Stock variance detected" },
  { notificationId: new Int32(22), userId: new Int32(2), status: "unread", message: "Weekly report submission pending" },

  // USER 3 (Salma)
  { notificationId: new Int32(3), userId: new Int32(3), status: "unread",  message: "2 tasks due today" },
  { notificationId: new Int32(31), userId: new Int32(3), status: "read",   message: "Support ticket resolved" },
  { notificationId: new Int32(32), userId: new Int32(3), status: "unread", message: "Customer escalation waiting" },

  // USER 4 (Omar)
  { notificationId: new Int32(4), userId: new Int32(4), status: "unread",  message: "Campaign brief needs approval" },
  { notificationId: new Int32(41), userId: new Int32(4), status: "read",   message: "Design materials uploaded" },
  { notificationId: new Int32(42), userId: new Int32(4), status: "unread", message: "Meeting with marketing team at 2 PM" },

  // USER 5 (Lina)
  { notificationId: new Int32(5), userId: new Int32(5), status: "read",    message: "Meeting scheduled at 3 PM" },
  { notificationId: new Int32(51), userId: new Int32(5), status: "unread", message: "Team update required" },
  { notificationId: new Int32(52), userId: new Int32(5), status: "unread", message: "New task assigned from manager" },

  // USER 6 (Mostafa)
  { notificationId: new Int32(6), userId: new Int32(6), status: "unread",  message: "System test required" },
  { notificationId: new Int32(61), userId: new Int32(6), status: "read",   message: "Performance test completed" },
  { notificationId: new Int32(62), userId: new Int32(6), status: "unread", message: "New bug reported by QA team" },

  // USER 7 (Nour)
  { notificationId: new Int32(7), userId: new Int32(7), status: "unread",  message: "Data entry task updated" },
  { notificationId: new Int32(71), userId: new Int32(7), status: "read",   message: "Customer list synced" },
  { notificationId: new Int32(72), userId: new Int32(7), status: "unread", message: "New data batch available" },

  // USER 8 (Hana)
  { notificationId: new Int32(8), userId: new Int32(8), status: "read",    message: "Financial review pending" },
  { notificationId: new Int32(81), userId: new Int32(8), status: "unread", message: "Budget approval required" },
  { notificationId: new Int32(82), userId: new Int32(8), status: "unread", message: "Expense report uploaded" }
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
