import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AddProjectComponent } from '../add-project/add-project.component';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {
  _projectId: string;
  _data: any;

  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router, private dialog: MatDialog ) { 
    this._projectId = this.route.snapshot.paramMap.get('id') || ''
  }

  editProjectDetails(_data: any){
    this.dialog.open(AddProjectComponent, {
      width: '30%',
      data: _data
    }).afterClosed().subscribe(val => {
      if (val === 'update'){
        this.ngOnInit();
      }
    })
  }


  backProjectListPage(){
    this.router.navigate(['projects'], {
    })
  }

  ngOnInit(): void {
    this.api.getProject(this._projectId).subscribe({
      next:(res)=>{
        this._data = res
      },
      error:(err)=>{
        alert("Error while fetching the projects data!")
      }
    })
  }

}
