import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AddTaskComponent } from '../add-task/add-task.component';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss'],
})
export class TaskDetailComponent implements OnInit {
  _taskId: string;
  _tasksData: any;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this._taskId = this.route.snapshot.paramMap.get('id') || '';
  }

  editTaskDetails(_tasksData: any) {
    this.dialog
      .open(AddTaskComponent, {
        width: '30%',
        data: _tasksData,
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'update') {
          this.ngOnInit();
        }
      });
  }

  backTasksListPage() {
    this.router.navigate(['tasks'], {});
  }

  backCalendarPage() {
    this.router.navigate(['planning'], {});
  }

  ngOnInit(): void {
    this.api.getTask(this._taskId).subscribe({
      next: (res) => {
        this._tasksData = res;
      },
      error: (err) => {
        alert('Error while fetching the tasks data!');
      },
    });
  }
}
