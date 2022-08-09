import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef } from '@angular/material/dialog'
@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent implements OnInit {

  emailFormControl = new FormControl('', Validators.email);
  projectForm !: FormGroup;
  constructor(private formBuilder: FormBuilder, private api: ApiService, private dialogRef: MatDialogRef<AddProjectComponent>) { }

  ngOnInit(): void {
    this.projectForm = this.formBuilder.group({
      category: ['', Validators.required],
      projectName: ['', Validators.required],
      projectStartDate: ['', Validators.required],
      projectEndDate: ['', Validators.required],
      references: [''],
      contactName: [''],
      contactEmail: ['', Validators.email],
      contactPhoneNumber: [''],
      cost: [''],
      comments: ['']
    })
  }
  
  addProject(){
    if(this.projectForm.valid){
      this.api.postProject(this.projectForm.value)
      .subscribe({
        next:(res)=>{
          alert("Project added successfully");
          this.projectForm.reset();
          this.dialogRef.close('saved');
        },
        error:()=>{
          alert("Error while adding the project")
        }
      })
    }
  }
}


