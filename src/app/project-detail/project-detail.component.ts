import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AddProjectComponent } from '../add-project/add-project.component';
import { ApiService } from '../services/api.service';
import { Chart } from 'node_modules/chart.js';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],
})
export class ProjectDetailComponent implements OnInit {
  _projectId: string;
  _data: any;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this._projectId = this.route.snapshot.paramMap.get('id') || '';
  }

  editProjectDetails(_data: any) {
    this.dialog
      .open(AddProjectComponent, {
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

  backProjectListPage() {
    this.router.navigate(['projects'], {});
  }

  ngOnInit(): void {
    this.api.getProject(this._projectId).subscribe({
      next: (res) => {
        this._data = res;
      },
      error: (err) => {
        alert('Error while fetching the projects data!');
      },
    });
    const projectsTasksChart = new Chart('projectsTasksChart', {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'Tasks',
            data: [
              { x: '2016-12-25', y: 20 },
              { x: '2016-12-26', y: 10 },
              { x: '2016-12-27', y: 12 },
              { x: '2016-12-28', y: 5 },
              { x: '2016-12-29', y: 23 },
              { x: '2016-12-30', y: 14 },
              { x: '2016-12-31', y: 17 },
              { x: '2017-01-01', y: 10 },
            ],
          },
        ],
      },
    });
  }
}
