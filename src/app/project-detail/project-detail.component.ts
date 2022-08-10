import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    
  }
  getProject(id: number){
    this.api.getProjectDetails(id);
    console.log(id)
  }
  
}
