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
  dataSource2!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private api: ApiService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  openDialogAddTask() {
    this.dialog
      .open(AddTaskComponent, {
        width: '30%',
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'save') {
          this.getAllTasks();
        }
      });
  }

  openPageTaskDetails(row: any) {
    this.router.navigate([`task-detail/${row.id}`], {});
  }

  getAllTasks() {
    this.api.getTasks().subscribe({
      next: (res) => {
        this.dataSource2 = new MatTableDataSource(res);
        this.dataSource2.paginator = this.paginator;
        this.dataSource2.sort = this.sort;
      },
      error: (err) => {
        alert('Error while fetching the task data!');
      },
    });
  }

  editTask(event: any, row: any) {
    event.stopPropagation();
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

  deleteTask(event: any, id: number, taskName: any) {
    event.stopPropagation();
    if (confirm(`Are you sure to delete ${taskName}`)) {
      this.api.deleteTask(id).subscribe({
        next: (res) => {
          this.getAllTasks();
        },
        error: () => {
          alert('Error while deleting the task');
        },
      });
    }
  }

  archiveTask(event: any) {
    event.stopPropagation();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource2.filter = filterValue.trim().toLowerCase();

    if (this.dataSource2.paginator) {
      this.dataSource2.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    this.getAllTasks();
  }
}
