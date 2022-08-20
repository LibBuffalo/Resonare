import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AddProjectComponent } from '../add-project/add-project.component';
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

  backProjectListPage() {
    this.router.navigate(['projects'], {});
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
            .map((filteredTasks: any) => {
              return {
                taskName: filteredTasks.taskName,
                taskDate: filteredTasks.taskDate,
                taskDeadline: filteredTasks.taskDeadline,
                references: filteredTasks.references,
                comments: filteredTasks.comments,
              };
            });
          console.log(this._projectRelatedTasks);
          this._infoAboutProjectRelatedTasks = { ...this._projectRelatedTasks };
          console.log(this._projectRelatedTasks);
          // this.projectRelatedTasks = this._tasksData.map((task: any) => {
          //   console.log(task.projectName);
          //   console.log(this._projectsData.projectName);
          //   if (task.projectName == this._projectsData.projectName) {
          //     return {
          //       taskName2: task.taskName,
          //     };
          //   }
          //   return {
          //     taskName: task.taskName,
          //   };
          // });
          // console.log(this.projectRelatedTasks);
        },
        error: (err) => {
          alert('Error while fetching the projects data!');
        },
      });
    }, 100);
  }
}
// const projectsTasksChart = new Chart('projectsTasksChart', {
//   type: 'line',
//   data: {
//     datasets: [
//       {
//         label: 'Tasks',
//         data: [
//           { x: '2016-12-25', y: 20 },
//           { x: '2016-12-26', y: 10 },
//           { x: '2016-12-27', y: 12 },
//           { x: '2016-12-28', y: 5 },
//           { x: '2016-12-29', y: 23 },
//           { x: '2016-12-30', y: 14 },
//           { x: '2016-12-31', y: 17 },
//           { x: '2017-01-01', y: 10 },
//         ],
//       },
//     ],
//   },
// });
