import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddProjectComponent } from '../add-project/add-project.component';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss']
})



export class ProjectsListComponent implements OnInit {
  displayedColumns: string[] = ['category', 'projectName', 'projectStartDate', 'projectEndDate', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private dialog: MatDialog, private api: ApiService){}

  openDialogAddProject() {
    this.dialog.open(AddProjectComponent, {
      width: '30%'
    }).afterClosed().subscribe(val=>{
      if(val === 'save'){
        this.getAllProjects();
      }

    })
  }

  getAllProjects(){
    this.api.getProjects().subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:(err)=>{
        alert("Error while fetching the projects data!")
      }
    })
  }

  editProject(row: any){
    this.dialog.open(AddProjectComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(val=>{
      if(val === 'update'){
        this.getAllProjects();
      }
    })
  }

  deleteProject(id: number){
    this.api.deleteProject(id).subscribe({
      next:(res)=>{
        alert("Project Deleted Successfully");
        this.getAllProjects();
      },
      error:()=>{
        alert("Error while deleting the project");
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openProjectDetails(id: number){
    this.api.getProjectDetails(id).subscribe({
      next:(res)=>{
        console.log(res);
      },
      error:()=>{
        alert("Error while fetching project details");
      }
    })
    
  }
  ngOnInit(): void {
    this.getAllProjects();
  }


}


