import { Component, Inject, OnInit } from '@angular/core';
import {
  UntypedFormGroup,
  UntypedFormBuilder,
  Validators,
  UntypedFormControl,
} from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {
  emailFormControl = new UntypedFormControl('', Validators.required);
  taskForm!: UntypedFormGroup;
  saveButton: string = 'Save';
  dialogTitel: string = 'ADD TASK';
  projectsResponse: any;
  projects: any;
  currentDate = new Date();

  constructor(
    private formBuilder: UntypedFormBuilder,
    private api: ApiService,
    private dialogRef: MatDialogRef<AddTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) {}

  getAllProjects() {
    this.api.getProjects().subscribe({
      next: (res) => {
        this.projectsResponse = res;
        this.projects = this.projectsResponse.map((_val: any) => {
          return _val;
        });
      },
      error: (err) => {
        alert('Error while fetching the projects data!');
      },
    });
  }

  ngOnInit(): void {
    this.getAllProjects();

    this.taskForm = this.formBuilder.group({
      projectName: [''],
      taskName: ['', Validators.required],
      // taskStartDate: [''],
      // taskEndDate: [''],
      taskDate: this.currentDate,
      taskDeadline: ['', Validators.required],
      references: [''],
      comments: [''],
    });

    if (this.editData) {
      this.dialogTitel = 'EDIT TASK';
      this.saveButton = 'Update';
      this.taskForm.controls['taskName'].setValue(this.editData.taskName);
      this.taskForm.controls['projectName'].setValue(this.editData.projectName);
      this.taskForm.controls['taskDeadline'].setValue(
        this.editData.taskDeadline
      );
      this.taskForm.controls['taskDate'].setValue(this.editData.taskDate);
      this.taskForm.controls['references'].setValue(this.editData.references);
      this.taskForm.controls['comments'].setValue(this.editData.comments);
    }
  }

  addTask() {
    if (!this.editData) {
      if (this.taskForm.valid) {
        this.api.postTask(this.taskForm.value).subscribe({
          next: (res) => {
            alert('Task added successfully');
            this.taskForm.reset();
            this.dialogRef.close('save');
          },
          error: () => {
            alert('Error while adding the task');
          },
        });
      }
    } else {
      this.updateTask();
    }
  }

  updateTask() {
    this.api.putTask(this.taskForm.value, this.editData.id).subscribe({
      next: (res) => {
        alert('Task updated Successfully');
        this.taskForm.reset();
        this.dialogRef.close('update');
      },
      error: (err) => {
        alert('Error while updating the task');
      },
    });
  }
}
