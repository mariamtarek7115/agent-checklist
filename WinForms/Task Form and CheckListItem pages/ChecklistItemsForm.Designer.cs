namespace DatabaseProject
{
    partial class ChecklistItemsForm
    {
        private System.ComponentModel.IContainer components = null;

        private System.Windows.Forms.ComboBox cmbTaskFilter;
        private System.Windows.Forms.DataGridView dgvItems;
        private System.Windows.Forms.TextBox txtTitle;
        private System.Windows.Forms.ComboBox cmbStatus;
        private System.Windows.Forms.Button btnAdd;
        private System.Windows.Forms.Button btnUpdate;
        private System.Windows.Forms.Button btnDelete;
        private System.Windows.Forms.Button btnBack;

        private System.Windows.Forms.Label lblTask;
        private System.Windows.Forms.Label lblTitle;
        private System.Windows.Forms.Label lblStatus;

        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        private void InitializeComponent()
        {
            this.cmbTaskFilter = new System.Windows.Forms.ComboBox();
            this.dgvItems = new System.Windows.Forms.DataGridView();
            this.txtTitle = new System.Windows.Forms.TextBox();
            this.cmbStatus = new System.Windows.Forms.ComboBox();

            this.btnAdd = new System.Windows.Forms.Button();
            this.btnUpdate = new System.Windows.Forms.Button();
            this.btnDelete = new System.Windows.Forms.Button();
            this.btnBack = new System.Windows.Forms.Button();

            this.lblTask = new System.Windows.Forms.Label();
            this.lblTitle = new System.Windows.Forms.Label();
            this.lblStatus = new System.Windows.Forms.Label();

            ((System.ComponentModel.ISupportInitialize)(this.dgvItems)).BeginInit();
            this.SuspendLayout();

            // ----------------------------
            // Label: Task Filter
            // ----------------------------
            this.lblTask.Text = "Filter by Task ID:";
            this.lblTask.Location = new System.Drawing.Point(20, 15);
            this.lblTask.AutoSize = true;

            // ----------------------------
            // ComboBox: Task Filter
            // ----------------------------
            this.cmbTaskFilter.Location = new System.Drawing.Point(130, 12);
            this.cmbTaskFilter.Size = new System.Drawing.Size(120, 23);
            this.cmbTaskFilter.SelectedIndexChanged += new System.EventHandler(this.cmbTaskFilter_SelectedIndexChanged);

            // ----------------------------
            // DataGridView
            // ----------------------------
            this.dgvItems.Location = new System.Drawing.Point(20, 50);
            this.dgvItems.Size = new System.Drawing.Size(460, 200);
            this.dgvItems.SelectionMode = System.Windows.Forms.DataGridViewSelectionMode.FullRowSelect;
            this.dgvItems.MultiSelect = false;

            this.dgvItems.Columns.Add("itemId", "Item ID");
            this.dgvItems.Columns.Add("taskId", "Task ID");
            this.dgvItems.Columns.Add("title", "Title");
            this.dgvItems.Columns.Add("status", "Status");

            this.dgvItems.SelectionChanged += new System.EventHandler(this.dgvItems_SelectionChanged);

            // ----------------------------
            // Label: Title
            // ----------------------------
            this.lblTitle.Text = "Title:";
            this.lblTitle.Location = new System.Drawing.Point(20, 270);
            this.lblTitle.AutoSize = true;

            // ----------------------------
            // TextBox: Title
            // ----------------------------
            this.txtTitle.Location = new System.Drawing.Point(130, 267);
            this.txtTitle.Size = new System.Drawing.Size(180, 23);

            // ----------------------------
            // Label: Status
            // ----------------------------
            this.lblStatus.Text = "Status:";
            this.lblStatus.Location = new System.Drawing.Point(20, 310);
            this.lblStatus.AutoSize = true;

            // ----------------------------
            // ComboBox: Status
            // ----------------------------
            this.cmbStatus.Location = new System.Drawing.Point(130, 307);
            this.cmbStatus.Size = new System.Drawing.Size(180, 23);
            this.cmbStatus.Items.AddRange(new object[] { "Pending", "Completed" });

            // ----------------------------
            // Button: Add
            // ----------------------------
            this.btnAdd.Text = "Add Item";
            this.btnAdd.Location = new System.Drawing.Point(340, 265);
            this.btnAdd.Size = new System.Drawing.Size(120, 30);
            this.btnAdd.BackColor = System.Drawing.Color.DodgerBlue;
            this.btnAdd.ForeColor = System.Drawing.Color.White;
            this.btnAdd.Click += new System.EventHandler(this.btnAdd_Click);

            // ----------------------------
            // Button: Update
            // ----------------------------
            this.btnUpdate.Text = "Update Item";
            this.btnUpdate.Location = new System.Drawing.Point(340, 305);
            this.btnUpdate.Size = new System.Drawing.Size(120, 30);
            this.btnUpdate.BackColor = System.Drawing.Color.DodgerBlue;
            this.btnUpdate.ForeColor = System.Drawing.Color.White;
            this.btnUpdate.Click += new System.EventHandler(this.btnUpdate_Click);

            // ----------------------------
            // Button: Delete
            // ----------------------------
            this.btnDelete.Text = "Delete Item";
            this.btnDelete.Location = new System.Drawing.Point(340, 345);
            this.btnDelete.Size = new System.Drawing.Size(120, 30);
            this.btnDelete.BackColor = System.Drawing.Color.DodgerBlue;
            this.btnDelete.ForeColor = System.Drawing.Color.White;
            this.btnDelete.Click += new System.EventHandler(this.btnDelete_Click);

            // ----------------------------
            // Button: Back
            // ----------------------------
            this.btnBack.Text = "Back to Tasks";
            this.btnBack.Location = new System.Drawing.Point(20, 350);
            this.btnBack.Size = new System.Drawing.Size(120, 30);
            this.btnBack.Click += new System.EventHandler(this.btnBack_Click);

            // ----------------------------
            // Form Setup
            // ----------------------------
            this.ClientSize = new System.Drawing.Size(500, 400);
            this.Controls.Add(this.lblTask);
            this.Controls.Add(this.cmbTaskFilter);
            this.Controls.Add(this.dgvItems);
            this.Controls.Add(this.lblTitle);
            this.Controls.Add(this.txtTitle);
            this.Controls.Add(this.lblStatus);
            this.Controls.Add(this.cmbStatus);
            this.Controls.Add(this.btnAdd);
            this.Controls.Add(this.btnUpdate);
            this.Controls.Add(this.btnDelete);
            this.Controls.Add(this.btnBack);

            this.Text = "Checklist Items";

            ((System.ComponentModel.ISupportInitialize)(this.dgvItems)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();
        }
    }
}
