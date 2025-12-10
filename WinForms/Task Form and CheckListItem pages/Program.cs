using System;
using System.Windows.Forms;
using MongoDB.Bson;

namespace DatabaseProject
{
    internal static class Program
    {
        [STAThread]
        static void Main()
        {
            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);

            // create shared DB context
            var db = new MongoDbContext();

            // TEST: replace with the user's actual ObjectId from your DB
            var loggedInUserId = ObjectId.Parse("6938a55a0d5846632e531958");

            Application.Run(new TasksForm(db, loggedInUserId));
        }
    }
}
