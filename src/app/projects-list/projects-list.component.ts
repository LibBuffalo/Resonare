import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss']
})



export class ProjectsListComponent implements OnInit {
  
  addProjectButton() {
    let project = new AddProject('Helikunst', 'talveProjekt');
    console.log(project)
  }

  ngOnInit(): void {
  }

}

let projectData: [];

class AddProject {
  category: string;
  projectName: any;
  projectDate: any;
  deadline: any;
  constructor(_category: string, _projectName: any) {
    this.category = _category;
    this.projectName = _projectName;
    this.projectDate = "";
    this.deadline = "";
  }
  projectProperiesToArray() {
    
  }
}


