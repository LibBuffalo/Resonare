import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent implements OnInit {

  emailFormControl = new FormControl('', Validators.email);
  projectForm !: FormGroup;
  saveButton: string = "Save";
  dialogTitel: string = "ADD PROJECT";
  
  constructor(
    private formBuilder: FormBuilder, 
    private api: ApiService, 
    private dialogRef: MatDialogRef<AddProjectComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any,
  ) { }

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
    });

    if(this.editData){
      this.dialogTitel = "EDIT PROJECT"
      this.saveButton = "Update"
      this.projectForm.controls['category'].setValue(this.editData.category);
      this.projectForm.controls['projectName'].setValue(this.editData.projectName);
      this.projectForm.controls['projectStartDate'].setValue(this.editData.projectStartDate);
      this.projectForm.controls['projectEndDate'].setValue(this.editData.projectEndDate);
      this.projectForm.controls['references'].setValue(this.editData.references);
      this.projectForm.controls['contactName'].setValue(this.editData.contactName);
      this.projectForm.controls['contactEmail'].setValue(this.editData.contactEmail);
      this.projectForm.controls['contactPhoneNumber'].setValue(this.editData.contactPhoneNumber);
      this.projectForm.controls['cost'].setValue(this.editData.cost);
      this.projectForm.controls['comments'].setValue(this.editData.comments);
    }
  }
  
  addProject(){
   if(!this.editData){
    if(this.projectForm.valid){
      this.api.postProject(this.projectForm.value).subscribe({
        next:(res)=>{
          alert("Project added successfully");
          this.projectForm.reset();
          this.dialogRef.close('save');
        },
        error:()=>{
          alert("Error while adding the project")
        }
      })
    }
   }else{
     this.updateProject()
   }
  }

  updateProject(){
    this.api.putProject(this.projectForm.value, this.editData.id).subscribe({
      next:(res)=>{
        alert("Project updated Successfully");
        this.projectForm.reset();
        this.dialogRef.close('update');
      },
      error:(err)=>{
        alert("Error while updating the project")
      }
    })
  }
}


