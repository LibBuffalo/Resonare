import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AddProjectComponent } from '../add-project/add-project.component';
import { AddTaskComponent } from '../add-task/add-task.component';
import { ApiService } from '../services/api.service';
import { TaskDetailComponent } from '../task-detail/task-detail.component';
// import { Chart } from 'node_modules/chart.js';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],
})
export class ProjectDetailComponent implements OnInit {
  _projectId: string;
  _projectsData: any;
  _tasksData: any;
  _projectRelatedTasks: any;
  _infoAboutProjectRelatedTasks: any;
  relatedTask: any;
  today: Date = new Date();
  // deadlinePast: any;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this._projectId = this.route.snapshot.paramMap.get('id') || '';
  }

  editProjectDetails(_projectsData: any) {
    this.dialog
      .open(AddProjectComponent, {
        width: '30%',
        data: _projectsData,
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'update') {
          this.ngOnInit();
        }
      });
  }

  editTask(relatedTask: any) {
    this.dialog
      .open(AddTaskComponent, {
        width: '30%',
        data: relatedTask,
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'update') {
          this.ngOnInit();
        }
      });
  }

  backProjectListPage() {
    this.router.navigate(['projects'], {});
  }

  taskListPage() {
    this.router.navigate(['tasks'], {});
  }

  openDialogAddTask() {
    this.dialog
      .open(AddTaskComponent, {
        width: '30%',
      })
      .afterClosed()
      .subscribe((val) => {
        this.api.getTasks().subscribe({
          next: (res) => {
            this._tasksData = res;
            this._projectRelatedTasks = this._tasksData
              .filter((filteredTasks: any) => {
                if (
                  filteredTasks.projectName !== this._projectsData.projectName
                ) {
                  return false;
                }
                return true;
              })
              .map((lastTaskResults: any) => {
                return {
                  taskId: lastTaskResults.id,
                  taskName: lastTaskResults.taskName,
                  taskDate: lastTaskResults.taskDate,
                  taskDeadline: lastTaskResults.taskDeadline,
                  references: lastTaskResults.references,
                  comments: lastTaskResults.comments,
                };
              });
          },
          error: (err) => {
            alert('Error while fetching the projects data!');
          },
        });
      });
  }

  backCalendarPage() {
    this.router.navigate(['planning'], {});
  }

  ngOnInit(): void {
    this.api.getProject(this._projectId).subscribe({
      next: (res) => {
        this._projectsData = res;
      },
      error: (err) => {
        alert('Error while fetching the projects data!');
      },
    });

    setTimeout(() => {
      this.api.getTasks().subscribe({
        next: (res) => {
          this._tasksData = res;
          this._projectRelatedTasks = this._tasksData
            .filter((filteredTasks: any) => {
              if (
                filteredTasks.projectName !== this._projectsData.projectName
              ) {
                return false;
              }
              return true;
            })
            .map((lastTaskResults: any) => {
              return {
                projectName: lastTaskResults.projectName,
                taskId: lastTaskResults.id,
                taskName: lastTaskResults.taskName,
                taskDate: lastTaskResults.taskDate,
                taskDeadline: lastTaskResults.taskDeadline,
                references: lastTaskResults.references,
                comments: lastTaskResults.comments,
              };
            });
          console.log(this._projectRelatedTasks);
          console.log(this._tasksData);
        },
        error: (err) => {
          alert('Error while fetching the projects data!');
        },
      });
    }, 50);
  }
}
