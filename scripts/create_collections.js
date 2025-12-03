require('dotenv').config();
const { MongoClient } = require('mongodb');

async function setupDatabase() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error("MONGO_URI not found in .env file");
    return;
  }

const client = new MongoClient(uri); // <-- no options needed

  try {
    // Connect to MongoDB
    await client.connect();
    console.log("Connected to MongoDB");

    // Select your database
    const db = client.db("AgentChecklistDB");

    // Create collections
    await db.createCollection("users");
    await db.createCollection("checklistItems");
    await db.createCollection("notifications");
    await db.createCollection("reports");
    console.log("Collections created successfully.");

    // Create indexes
    await db.collection("users").createIndex({ userId: 1 });
    await db.collection("notifications").createIndex({ userId: 1, status: 1 });
    await db.collection("checklistItems").createIndex({ taskId: 1 });
    console.log("Indexes created successfully.");

    // Apply validation rules for users
    await db.command({
      collMod: "users",
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["userId", "name", "email", "checklists"],
          properties: {
            userId: { bsonType: "int" },
            name: { bsonType: "string" },
            email: { bsonType: "string" },
            checklists: {
              bsonType: "array",
              items: {
                bsonType: "object",
                required: ["checklistId", "title", "status", "tasks"],
                properties: {
                  checklistId: { bsonType: "int" },
                  title: { bsonType: "string" },
                  status: { bsonType: "string" },
                  tasks: {
                    bsonType: "array",
                    items: {
                      bsonType: "object",
                      required: ["taskId", "title"],
                      properties: {
                        taskId: { bsonType: "int" },
                        title: { bsonType: "string" }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    });
    console.log("Validation rules applied.");
    
  } catch (err) {
    console.error("Error setting up database:", err);
  } finally {
    await client.close();
    console.log("MongoDB connection closed");
  }
}

// Run the setup
setupDatabase();
