require("dotenv").config();
const { MongoClient } = require("mongodb");

async function applyValidation() {
  const uri = process.env.MONGO_URI;
  if (!uri) return console.error("❌ Missing MONGO_URI in .env");

  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("✅ Connected to MongoDB for schema updates");

    const db = client.db("AgentChecklistDB");

    await db.command({
      collMod: "users",
      validator: {
        $jsonSchema: {
          bsonType: "object",

          
          required: ["userId", "name", "email", "password", "checklists"],

          properties: {
            userId: { bsonType: "int" },
            name: { bsonType: "string" },
            email: { bsonType: "string" },

            
            password: { bsonType: "string" },

            checklists: {
              bsonType: "array",
              items: {
                bsonType: "object",

                required: ["checklistId", "title", "description", "status", "tasks", "report"],

                properties: {
                  checklistId: { bsonType: "int" },
                  title: { bsonType: "string" },
                  description: { bsonType: "string" },
                  status: { bsonType: "string" },

                  report: {
                    bsonType: "object",
                    required: ["progressPercent", "date"],
                    properties: {
                      progressPercent: { bsonType: "int" },
                      date: { bsonType: "date" }
                    }
                  },

                  tasks: {
                    bsonType: "array",
                    items: {
                      bsonType: "object",
                      required: ["taskId", "title", "signOff"],
                      properties: {
                        taskId: { bsonType: "int" },
                        title: { bsonType: "string" },

                        signOff: {
                          bsonType: "object",
                          required: ["timestamp"],
                          properties: {
                            timestamp: { bsonType: "date" }
                          }
                        }
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

    console.log("✅ Validation rules applied successfully");

  } catch (err) {
    console.error("❌ Error applying validation rules:", err);
  } finally {
    await client.close();
    console.log("🔌 MongoDB connection closed");
  }
}

applyValidation();
