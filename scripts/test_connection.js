require('dotenv').config();
const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.MONGO_URI);

async function run() {
    try {
        await client.connect();
        console.log("✅ Connected successfully!");
    } catch(err) {
        console.error("❌ Connection failed:", err);
    } finally {
        await client.close();
    }
}

run();
