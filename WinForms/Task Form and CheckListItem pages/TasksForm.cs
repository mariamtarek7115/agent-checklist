using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Windows.Forms;

namespace DatabaseProject
{
    public partial class TasksForm : Form
    {
        private readonly MongoDbContext _db;
        private readonly ObjectId _loggedInUserId;

        public TasksForm(MongoDbContext db, ObjectId loggedInUserId)
        {
            InitializeComponent();
            _db = db;
            _loggedInUserId = loggedInUserId;

            // UI Style
            this.BackColor = System.Drawing.Color.White;
            btnAdd.BackColor = btnUpdate.BackColor = btnDelete.BackColor = System.Drawing.Color.DodgerBlue;
            btnAdd.ForeColor = btnUpdate.ForeColor = btnDelete.ForeColor = System.Drawing.Color.White;

            // Link the double-click
            lstTasks.DoubleClick += lstTasks_DoubleClick;

            LoadChecklists();
        }

        // -------------------------------------------------------------
        // OPEN CHECKLIST ITEMS PAGE FOR SELECTED TASK
        // -------------------------------------------------------------
        private void lstTasks_DoubleClick(object sender, EventArgs e)
        {
            if (lstTasks.SelectedItem == null) return;

            int taskId = Convert.ToInt32(lstTasks.SelectedItem.ToString().Split('-')[0].Trim());

            // Open Items Page
            var itemsForm = new ChecklistItemsForm(_db);
            itemsForm.SetFilterTaskId(taskId);
            itemsForm.ShowDialog(this);
        }

        // -------------------------------------------------------------
        // LOAD CHECKLISTS
        // -------------------------------------------------------------
        private void LoadChecklists()
        {
            var filter = Builders<BsonDocument>.Filter.Eq("_id", _loggedInUserId);
            var user = _db.Users.Find(filter).FirstOrDefault();
            if (user == null) return;

            var checklists = user.GetValue("checklists", new BsonArray()).AsBsonArray;

            var list = checklists.Select(x =>
            {
                var doc = x.AsBsonDocument;

                return new
                {
                    Title = doc.GetValue("title", "").AsString,
                    ChecklistId = doc.GetValue("checklistId", 0).ToInt32()
                };
            }).ToList();

            cmbChecklists.DataSource = list;
            cmbChecklists.DisplayMember = "Title";
            cmbChecklists.ValueMember = "ChecklistId";
        }

        // -------------------------------------------------------------
        // LOAD TASKS WHEN SELECTING CHECKLIST
        // -------------------------------------------------------------
        private void cmbChecklists_SelectedIndexChanged(object sender, EventArgs e)
        {
            lstTasks.Items.Clear();
            if (cmbChecklists.SelectedValue == null) return;

            int checklistId = Convert.ToInt32(cmbChecklists.SelectedValue);

            var filter = Builders<BsonDocument>.Filter.And(
                Builders<BsonDocument>.Filter.Eq("_id", _loggedInUserId),
                Builders<BsonDocument>.Filter.Eq("checklists.checklistId", checklistId)
            );

            var user = _db.Users.Find(filter).FirstOrDefault();
            if (user == null) return;

            var checklist = user["checklists"]
                .AsBsonArray
                .First(c => c.AsBsonDocument.GetValue("checklistId", 0).ToInt32() == checklistId)
                .AsBsonDocument;

            var tasks = checklist.GetValue("tasks", new BsonArray()).AsBsonArray;

            foreach (var t in tasks)
            {
                var doc = t.AsBsonDocument;
                int tid = doc.GetValue("taskId", 0).ToInt32();
                string title = doc.GetValue("title", "").AsString;

                lstTasks.Items.Add($"{tid} - {title}");
            }
        }

        // -------------------------------------------------------------
        // ADD TASK WITH INCREMENTAL taskId
        // -------------------------------------------------------------
        private void btnAdd_Click(object sender, EventArgs e)
        {
            if (cmbChecklists.SelectedValue == null) return;

            int checklistId = Convert.ToInt32(cmbChecklists.SelectedValue);

            if (string.IsNullOrWhiteSpace(txtTaskTitle.Text))
            {
                MessageBox.Show("Enter a task title");
                return;
            }

            var filterChecklist = Builders<BsonDocument>.Filter.And(
                Builders<BsonDocument>.Filter.Eq("_id", _loggedInUserId),
                Builders<BsonDocument>.Filter.Eq("checklists.checklistId", checklistId)
            );

            var user = _db.Users.Find(filterChecklist).FirstOrDefault();
            var checklist = user["checklists"]
                .AsBsonArray
                .First(c => c.AsBsonDocument.GetValue("checklistId", 0).ToInt32() == checklistId)
                .AsBsonDocument;

            var existingTasks = checklist.GetValue("tasks", new BsonArray()).AsBsonArray;

            // Incremental ID
            int nextTaskId = existingTasks.Any()
                ? existingTasks.Max(t => t.AsBsonDocument.GetValue("taskId", 0).ToInt32()) + 1
                : 1;

            var timestamp = chkSignOff.Checked ? DateTime.UtcNow : DateTime.MinValue;

            var newTask = new BsonDocument
            {
                { "taskId", nextTaskId },
                { "title", txtTaskTitle.Text },
                { "signOff", new BsonDocument { { "timestamp", timestamp } } }
            };

            var filter = Builders<BsonDocument>.Filter.And(
                Builders<BsonDocument>.Filter.Eq("_id", _loggedInUserId),
                Builders<BsonDocument>.Filter.Eq("checklists.checklistId", checklistId)
            );

            var update = Builders<BsonDocument>.Update.Push("checklists.$.tasks", newTask);
            _db.Users.UpdateOne(filter, update);

            MessageBox.Show("Task added successfully.");
            cmbChecklists_SelectedIndexChanged(null, null);
        }

        // -------------------------------------------------------------
        // UPDATE TASK
        // -------------------------------------------------------------
        private void btnUpdate_Click(object sender, EventArgs e)
        {
            if (lstTasks.SelectedItem == null)
            {
                MessageBox.Show("Select a task");
                return;
            }

            int checklistId = Convert.ToInt32(cmbChecklists.SelectedValue);
            int taskId = Convert.ToInt32(lstTasks.SelectedItem.ToString().Split('-')[0].Trim());

            var filter = Builders<BsonDocument>.Filter.Eq("_id", _loggedInUserId);

            var timestamp = chkSignOff.Checked ? DateTime.UtcNow : DateTime.MinValue;

            var update = Builders<BsonDocument>.Update
                .Set("checklists.$[c].tasks.$[t].title", txtTaskTitle.Text)
                .Set("checklists.$[c].tasks.$[t].signOff.timestamp", timestamp);

            var arrayFilters = new List<ArrayFilterDefinition>
            {
                new BsonDocumentArrayFilterDefinition<BsonDocument>(new BsonDocument("c.checklistId", checklistId)),
                new BsonDocumentArrayFilterDefinition<BsonDocument>(new BsonDocument("t.taskId", taskId))
            };

            var options = new UpdateOptions { ArrayFilters = arrayFilters };
            _db.Users.UpdateOne(filter, update, options);

            MessageBox.Show("Task updated successfully.");
            cmbChecklists_SelectedIndexChanged(null, null);
        }

        // -------------------------------------------------------------
        // DELETE TASK
        // -------------------------------------------------------------
        private void btnDelete_Click(object sender, EventArgs e)
        {
            if (lstTasks.SelectedItem == null)
            {
                MessageBox.Show("Select a task");
                return;
            }

            int checklistId = Convert.ToInt32(cmbChecklists.SelectedValue);
            int taskId = Convert.ToInt32(lstTasks.SelectedItem.ToString().Split('-')[0].Trim());

            var filter = Builders<BsonDocument>.Filter.And(
                Builders<BsonDocument>.Filter.Eq("_id", _loggedInUserId),
                Builders<BsonDocument>.Filter.Eq("checklists.checklistId", checklistId)
            );

            var update = Builders<BsonDocument>.Update.Pull("checklists.$.tasks",
                new BsonDocument("taskId", taskId));

            _db.Users.UpdateOne(filter, update);

            MessageBox.Show("Task deleted successfully.");
            cmbChecklists_SelectedIndexChanged(null, null);
        }

        // -------------------------------------------------------------
        // LOAD SELECTED TASK DETAILS
        // -------------------------------------------------------------
        private void lstTasks_SelectedIndexChanged(object sender, EventArgs e)
        {
            if (lstTasks.SelectedItem == null) return;

            int checklistId = Convert.ToInt32(cmbChecklists.SelectedValue);
            int taskId = Convert.ToInt32(lstTasks.SelectedItem.ToString().Split('-')[0].Trim());

            var filter = Builders<BsonDocument>.Filter.And(
                Builders<BsonDocument>.Filter.Eq("_id", _loggedInUserId),
                Builders<BsonDocument>.Filter.Eq("checklists.checklistId", checklistId)
            );

            var user = _db.Users.Find(filter).FirstOrDefault();
            if (user == null) return;

            var checklist = user["checklists"]
                .AsBsonArray
                .First(c => c.AsBsonDocument.GetValue("checklistId", 0).ToInt32() == checklistId)
                .AsBsonDocument;

            var task = checklist["tasks"]
                .AsBsonArray
                .First(t => t.AsBsonDocument.GetValue("taskId", 0).ToInt32() == taskId)
                .AsBsonDocument;

            txtTaskTitle.Text = task.GetValue("title", "").AsString;

            var sign = task.GetValue("signOff", new BsonDocument()).AsBsonDocument;
            chkSignOff.Checked = sign["timestamp"].ToUniversalTime() != DateTime.MinValue;
        }
    }
}
