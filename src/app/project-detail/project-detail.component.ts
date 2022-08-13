import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {
  _projectId: string;
  _data: any;

  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) { 
    this._projectId = this.route.snapshot.paramMap.get('id') || ''
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
