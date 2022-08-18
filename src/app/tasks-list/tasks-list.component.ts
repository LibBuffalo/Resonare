import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AddTaskComponent } from '../add-task/add-task.component';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss'],
})
export class TasksListComponent implements OnInit {
  displayedColumns: string[] = [
    'taskName',
    'projectName',
    'taskDate',
    'taskDeadline',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  // addTaskButton() {
  //   let project = new AddTask('Helikunst', 'Arrange meeting with partner');
  //   console.log(project);
  // }
  constructor(
    private api: ApiService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  openPageTaskDetails(row: any) {
    this.router.navigate([`task-detail/${row.id}`], {});
  }

  getAllTasks() {
    this.api.getTasks().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        alert('Error while fetching the task data!');
      },
    });
  }

  editTask(row: any) {
    this.dialog
      .open(AddTaskComponent, {
        width: '30%',
        data: row,
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'update') {
          this.getAllTasks();
        }
      });
  }

  deleteTask(id: number) {
    this.api.deleteTask(id).subscribe({
      next: (res) => {
        alert('Task Deleted Successfully');
        this.getAllTasks();
      },
      error: () => {
        alert('Error while deleting the task');
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

  ngOnInit(): void {}
}

// class AddTask {
//   category: string;
//   taskName: any;
//   taskComment: any;
//   deadline: any;

//   constructor(_category: string, _taskName: any) {
//     this.category = _category;
//     this.taskName = _taskName;
//     this.taskComment = '';
//     this.deadline = '';
//   }
// }
