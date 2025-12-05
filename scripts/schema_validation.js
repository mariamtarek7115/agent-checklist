


db = db.getSiblingDB("AgentChecklistDB");

// 02_schema_validation.js


db.runCommand({
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

              // EMBEDDED REPORT
              report: {
                bsonType: "object",
                required: ["progressPercent", "date"],
                properties: {
                  progressPercent: { bsonType: "double" },
                  date: { bsonType: "date" }
                }
              },

              // EMBEDDED TASKS
              tasks: {
                bsonType: "array",
                items: {
                  bsonType: "object",
                  required: ["taskId", "title", "checklistId", "signOff"],
                  properties: {
                    taskId: { bsonType: "int" },
                    title: { bsonType: "string" },
                    checklistId: { bsonType: "int" },

                    // EMBEDDED SIGNOFF
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

print("Validation rules applied successfully (users schema updated).");
