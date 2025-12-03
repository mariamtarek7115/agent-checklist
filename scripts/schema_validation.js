


db = db.getSiblingDB("AgentChecklistDB");

// Validation for users
db.runCommand({
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

print("Validation rules applied.");
