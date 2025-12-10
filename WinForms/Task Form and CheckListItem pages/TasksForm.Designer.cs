namespace DatabaseProject
{
    partial class TasksForm
    {
        private System.ComponentModel.IContainer components = null;
        private System.Windows.Forms.ComboBox cmbChecklists;
        private System.Windows.Forms.ListBox lstTasks;
        private System.Windows.Forms.TextBox txtTaskTitle;
        private System.Windows.Forms.CheckBox chkSignOff;
        private System.Windows.Forms.Button btnAdd;
        private System.Windows.Forms.Button btnUpdate;
        private System.Windows.Forms.Button btnDelete;

        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null)) components.Dispose();
            base.Dispose(disposing);
        }

        private void InitializeComponent()
        {
            this.cmbChecklists = new System.Windows.Forms.ComboBox();
            this.lstTasks = new System.Windows.Forms.ListBox();
            this.txtTaskTitle = new System.Windows.Forms.TextBox();
            this.chkSignOff = new System.Windows.Forms.CheckBox();
            this.btnAdd = new System.Windows.Forms.Button();
            this.btnUpdate = new System.Windows.Forms.Button();
            this.btnDelete = new System.Windows.Forms.Button();
            this.SuspendLayout();
            // 
            // cmbChecklists
            // 
            this.cmbChecklists.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
            this.cmbChecklists.FormattingEnabled = true;
            this.cmbChecklists.Location = new System.Drawing.Point(20, 20);
            this.cmbChecklists.Name = "cmbChecklists";
            this.cmbChecklists.Size = new System.Drawing.Size(360, 23);
            this.cmbChecklists.TabIndex = 0;
            this.cmbChecklists.SelectedIndexChanged += new System.EventHandler(this.cmbChecklists_SelectedIndexChanged);
            // 
            // lstTasks
            // 
            this.lstTasks.FormattingEnabled = true;
            this.lstTasks.ItemHeight = 15;
            this.lstTasks.Location = new System.Drawing.Point(20, 60);
            this.lstTasks.Name = "lstTasks";
            this.lstTasks.Size = new System.Drawing.Size(360, 184);
            this.lstTasks.TabIndex = 1;
            this.lstTasks.SelectedIndexChanged += new System.EventHandler(this.lstTasks_SelectedIndexChanged);
            // 
            // txtTaskTitle
            // 
            this.txtTaskTitle.Location = new System.Drawing.Point(20, 260);
            this.txtTaskTitle.Name = "txtTaskTitle";
            this.txtTaskTitle.Size = new System.Drawing.Size(360, 23);
            this.txtTaskTitle.TabIndex = 2;
            // 
            // chkSignOff
            // 
            this.chkSignOff.AutoSize = true;
            this.chkSignOff.Location = new System.Drawing.Point(20, 295);
            this.chkSignOff.Name = "chkSignOff";
            this.chkSignOff.Size = new System.Drawing.Size(80, 19);
            this.chkSignOff.TabIndex = 3;
            this.chkSignOff.Text = "Signed Off";
            this.chkSignOff.UseVisualStyleBackColor = true;
            // 
            // btnAdd
            // 
            this.btnAdd.Location = new System.Drawing.Point(20, 330);
            this.btnAdd.Name = "btnAdd";
            this.btnAdd.Size = new System.Drawing.Size(110, 36);
            this.btnAdd.TabIndex = 4;
            this.btnAdd.Text = "Add Task";
            this.btnAdd.UseVisualStyleBackColor = true;
            this.btnAdd.Click += new System.EventHandler(this.btnAdd_Click);
            // 
            // btnUpdate
            // 
            this.btnUpdate.Location = new System.Drawing.Point(136, 330);
            this.btnUpdate.Name = "btnUpdate";
            this.btnUpdate.Size = new System.Drawing.Size(110, 36);
            this.btnUpdate.TabIndex = 5;
            this.btnUpdate.Text = "Update Task";
            this.btnUpdate.UseVisualStyleBackColor = true;
            this.btnUpdate.Click += new System.EventHandler(this.btnUpdate_Click);
            // 
            // btnDelete
            // 
            this.btnDelete.Location = new System.Drawing.Point(252, 330);
            this.btnDelete.Name = "btnDelete";
            this.btnDelete.Size = new System.Drawing.Size(128, 36);
            this.btnDelete.TabIndex = 6;
            this.btnDelete.Text = "Delete Task";
            this.btnDelete.UseVisualStyleBackColor = true;
            this.btnDelete.Click += new System.EventHandler(this.btnDelete_Click);
            // 
            // TasksForm
            // 
            this.ClientSize = new System.Drawing.Size(404, 386);
            this.Controls.Add(this.btnDelete);
            this.Controls.Add(this.btnUpdate);
            this.Controls.Add(this.btnAdd);
            this.Controls.Add(this.chkSignOff);
            this.Controls.Add(this.txtTaskTitle);
            this.Controls.Add(this.lstTasks);
            this.Controls.Add(this.cmbChecklists);
            this.Name = "TasksForm";
            this.Text = "My Tasks";
            this.ResumeLayout(false);
            this.PerformLayout();
        }
    }
}
