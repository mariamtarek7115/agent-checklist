using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Windows.Forms;

namespace DatabaseProject
{
    public partial class ChecklistItemsForm : Form
    {
        private readonly MongoDbContext _db;

        public ChecklistItemsForm(MongoDbContext db)
        {
            InitializeComponent();
            _db = db;

            LoadTaskIds();
            LoadItems();
        }

        // --------------------------------------------------------------------
        // FILTER SUPPORT: Set from TasksForm
        // --------------------------------------------------------------------
        public void SetFilterTaskId(int taskId)
        {
            cmbTaskFilter.SelectedItem = taskId;
            LoadItems();
        }

        private void cmbTaskFilter_SelectedIndexChanged(object sender, EventArgs e)
        {
            LoadItems();
        }


        // --------------------------------------------------------------------
        // LOAD UNIQUE TASK IDs INTO COMBOBOX
        // --------------------------------------------------------------------
        private void LoadTaskIds()
        {
            var taskIds = new HashSet<int>();

            // 1) Load taskIds from checklistItems
            var allItems = _db.ChecklistItems.Find(FilterDefinition<BsonDocument>.Empty).ToList();
            foreach (var item in allItems)
                taskIds.Add(item.GetValue("taskId", 0).ToInt32());

            // 2) Load taskIds from ALL users
            var users = _db.Users.Find(FilterDefinition<BsonDocument>.Empty).ToList();
            foreach (var user in users)
            {
                var checklists = user.GetValue("checklists", new BsonArray()).AsBsonArray;
                foreach (var c in checklists)
                {
                    var tasks = c.AsBsonDocument.GetValue("tasks", new BsonArray()).AsBsonArray;
                    foreach (var t in tasks)
                    {
                        int tid = t.AsBsonDocument.GetValue("taskId", 0).ToInt32();
                        taskIds.Add(tid);
                    }
                }
            }

            // Bind to combo box
            cmbTaskFilter.DataSource = taskIds.OrderBy(x => x).ToList();
        }

        // --------------------------------------------------------------------
        // LOAD ITEMS OPTIONALLY FILTERED BY taskId
        // --------------------------------------------------------------------
        private void LoadItems()
        {
            int taskId = cmbTaskFilter.SelectedItem != null
                ? Convert.ToInt32(cmbTaskFilter.SelectedItem)
                : -1;

            var filter = taskId > 0
                ? Builders<BsonDocument>.Filter.Eq("taskId", taskId)
                : Builders<BsonDocument>.Filter.Empty;

            var items = _db.ChecklistItems.Find(filter).ToList();

            dgvItems.Rows.Clear();
            foreach (var item in items)
            {
                dgvItems.Rows.Add(
                    item.GetValue("itemId", 0).ToInt32(),
                    item.GetValue("taskId", 0).ToInt32(),
                    item.GetValue("title", "").AsString,
                    item.GetValue("status", "").AsString
                );
            }
        }

        // --------------------------------------------------------------------
        // ADD NEW ITEM
        // --------------------------------------------------------------------
        private void btnAdd_Click(object sender, EventArgs e)
        {
            if (string.IsNullOrWhiteSpace(txtTitle.Text))
            {
                MessageBox.Show("Enter a title.");
                return;
            }

            int taskId = Convert.ToInt32(cmbTaskFilter.SelectedItem);

            // Auto-increment
            var allItems = _db.ChecklistItems.Find(new BsonDocument()).ToList();
            int nextItemId = allItems.Any()
                ? allItems.Max(i => i.GetValue("itemId", 0).ToInt32()) + 1
                : 1;

            var newItem = new BsonDocument
            {
                { "itemId", nextItemId },
                { "taskId", taskId },
                { "title", txtTitle.Text },
                { "status", cmbStatus.Text }
            };

            _db.ChecklistItems.InsertOne(newItem);

            MessageBox.Show("Item added.");
            LoadItems();
        }

        // --------------------------------------------------------------------
        // UPDATE ITEM
        // --------------------------------------------------------------------
        private void btnUpdate_Click(object sender, EventArgs e)
        {
            if (dgvItems.SelectedRows.Count == 0)
            {
                MessageBox.Show("Select an item.");
                return;
            }

            int itemId = Convert.ToInt32(dgvItems.SelectedRows[0].Cells[0].Value);

            var filter = Builders<BsonDocument>.Filter.Eq("itemId", itemId);

            var update = Builders<BsonDocument>.Update
                .Set("title", txtTitle.Text)
                .Set("status", cmbStatus.Text);

            _db.ChecklistItems.UpdateOne(filter, update);

            MessageBox.Show("Item updated.");
            LoadItems();
        }

        // --------------------------------------------------------------------
        // DELETE ITEM
        // --------------------------------------------------------------------
        private void btnDelete_Click(object sender, EventArgs e)
        {
            if (dgvItems.SelectedRows.Count == 0)
            {
                MessageBox.Show("Select an item.");
                return;
            }

            int itemId = Convert.ToInt32(dgvItems.SelectedRows[0].Cells[0].Value);

            var filter = Builders<BsonDocument>.Filter.Eq("itemId", itemId);

            _db.ChecklistItems.DeleteOne(filter);

            MessageBox.Show("Item deleted.");
            LoadItems();
        }

        // --------------------------------------------------------------------
        // WHEN SELECTING A ROW → LOAD INTO INPUTS
        // --------------------------------------------------------------------
        private void dgvItems_SelectionChanged(object sender, EventArgs e)
        {
            if (dgvItems.SelectedRows.Count == 0)
                return;

            var row = dgvItems.SelectedRows[0];

            // Ignore new-row placeholder
            if (row.IsNewRow)
                return;

            var title = row.Cells[2].Value?.ToString();
            var status = row.Cells[3].Value?.ToString();

            txtTitle.Text = title ?? "";
            cmbStatus.Text = status ?? "";
        }


        // --------------------------------------------------------------------
        // BACK BUTTON
        // --------------------------------------------------------------------
        private void btnBack_Click(object sender, EventArgs e)
        {
            this.Close();
        }
    }
}
