import { Component } from '@angular/core';
import {
  CalendarOptions,
  defineFullCalendarElement,
} from '@fullcalendar/web-component';
import dayGridPlugin from '@fullcalendar/daygrid';
import { ApiService } from '../services/api.service';
import { DatePipe } from '@angular/common';

defineFullCalendarElement();

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.scss'],
})
export class PlanningComponent {
  projectsResponse: any[] = [];
  projectValues: any[] = [];
  tasksResponse: any[] = [];
  taskValues: any[] = [];
  // Events: any[] = [];
  calendarOptions: any;

  constructor(private api: ApiService) {}

  eventValuesForProjects: any = (val: any) => {
    const datepipe: DatePipe = new DatePipe('en-ET');
    let formattedDate = datepipe.transform(val.projectStartDate, 'YYYY-MM-dd');
    return {
      title: val.projectName,
      start: formattedDate,
      url: 'http://localhost:4200/project-detail/' + val.id,
      // start: '2022-08-20',
      color: 'red',
      textColor: 'white',
    };
  };

  eventValuesForTasks: any = (val: any) => {
    const datepipe: DatePipe = new DatePipe('en-ET');
    let formattedDate = datepipe.transform(val.taskDeadline, 'YYYY-MM-dd');
    console.log(formattedDate);
    console.log(val.taskDeadline);
    return {
      title: val.taskName,
      start: formattedDate,
      // start: '2022-08-20',
      color: 'red',
      textColor: 'green',
    };
  };

  getAllValuesForProjectsEvents() {
    this.api.getProjects().subscribe({
      next: (res) => {
        this.projectsResponse = res;
        this.projectValues = this.projectsResponse.map(
          this.eventValuesForProjects
        );
      },
    });
  }

  getAllValuesForTasksEvents() {
    this.api.getTasks().subscribe({
      next: (res) => {
        this.tasksResponse = res;
        this.taskValues = this.tasksResponse.map(this.eventValuesForTasks);
      },
      error: (err) => {
        alert('Error while fetching the Tasks data!');
      },
    });
  }

  ngOnInit() {
    this.getAllValuesForTasksEvents();
    this.getAllValuesForProjectsEvents();
    setTimeout(() => {
      this.calendarOptions = {
        plugins: [dayGridPlugin],
        headerToolbar: {
          left: 'prev, next today',
          center: 'title',
          right: 'dayGridMonth, dayGridWeek, dayGridDay',
        },
        editable: true,
        navLinks: true,
        events: this.projectValues,
        eventClick: function (info: any) {
          info.event.url;
        },
      };
      console.log(this.calendarOptions);
    }, 90);
  }
}
