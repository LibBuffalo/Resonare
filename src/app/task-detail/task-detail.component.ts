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
  _data: any;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this._taskId = this.route.snapshot.paramMap.get('id') || '';
  }

  editTaskDetails(_data: any) {
    this.dialog
      .open(AddTaskComponent, {
        width: '30%',
        data: _data,
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

  ngOnInit(): void {
    this.api.getTask(this._taskId).subscribe({
      next: (res) => {
        this._data = res;
      },
      error: (err) => {
        alert('Error while fetching the tasks data!');
      },
    });
  }
}
