import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { id } from 'date-fns/locale';
import { AddProjectComponent } from '../add-project/add-project.component';
import { AddTaskComponent } from '../add-task/add-task.component';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss'],
})
export class ProjectsListComponent implements OnInit {
  displayedColumns: string[] = [
    'category',
    'projectName',
    'projectStartDate',
    'projectEndDate',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;
  doneProjects: any[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private api: ApiService,
    private router: Router
  ) {}

  openDialogAddProject() {
    this.dialog
      .open(AddProjectComponent, {
        width: '30%',
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'save') {
          this.getAllProjects();
        }
      });
  }

  openDialogAddTask() {
    this.dialog
      .open(AddTaskComponent, {
        width: '30%',
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'save') {
          this.getAllProjects();
        }
      });
  }

  openPageProjectDetails(row: any) {
    this.router.navigate([`project-detail/${row.id}`], {});
  }

  getAllProjects() {
    this.api.getProjects().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        alert('Error while fetching the projects data!');
      },
    });
  }

  editProject(event: any, row: any) {
    event.stopPropagation();
    this.dialog
      .open(AddProjectComponent, {
        width: '30%',
        data: row,
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'update') {
          this.getAllProjects();
        }
      });
  }

  deleteProject(event: any, id: number, projectName: any) {
    event.stopPropagation();
    if (confirm(`Are you sure to delete project ${projectName}`)) {
      this.api.deleteProject(id).subscribe({
        next: (res) => {
          this.getAllProjects();
        },
        error: () => {
          alert('Error while deleting the project');
        },
      });
    }
  }

  archiveProject(event: any, row: any) {
    event.stopPropagation();
  }

  projectDone(event: any, row: any) {
    event.stopPropagation();
    this.doneProjects.push({ projectId: row, isCompleted: true });
    console.log(this.doneProjects);
    this.doneProjects.map(function (element) {
      if (element == row) {
      }
    });
    this.api
      .projectIsCompleted(
        this.dataSource.data
        // category: row.category,
        // projectName: row.projectName,
        // projectStartDate: row.projectStartDate,
        // projectEndDate: row.projectEndDate,
        // references: row.references,
        // contactName: row.contactName,
        // contactemail: row.contactEmail,
        // contactPhoneNumber: row.contactPhoneNumber,
        // cost: row.cost,
        // comments: row.comments,
        // id: row.id,
      )
      .subscribe({
        next: (res) => {
          alert('Project is done');
        },
        error: () => {
          alert('Error while adding the project');
        },
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    this.getAllProjects();
  }
}
