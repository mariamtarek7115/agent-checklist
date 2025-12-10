using MongoDB.Bson;
using MongoDB.Driver;

namespace DatabaseProject
{
    public class MongoDbContext
    {
        private readonly MongoClient _client;
        private readonly IMongoDatabase _database;

        public MongoDbContext()
        {
            // Put YOUR connection string here:
            var connectionString = "mongodb+srv://mariamibrahim7144:Test123@checklistcluster.btdhcat.mongodb.net/";

            _client = new MongoClient(connectionString);
            _database = _client.GetDatabase("AgentChecklistDB");
        }

        public IMongoCollection<BsonDocument> Users =>
            _database.GetCollection<BsonDocument>("users");

        public IMongoCollection<BsonDocument> ChecklistItems =>
            _database.GetCollection<BsonDocument>("checklistItems");

        public IMongoCollection<BsonDocument> Notifications =>
            _database.GetCollection<BsonDocument>("notifications");

        public IMongoCollection<BsonDocument> Reports =>
            _database.GetCollection<BsonDocument>("reports");
    }
}