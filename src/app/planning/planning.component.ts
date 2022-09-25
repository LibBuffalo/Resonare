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
  calendarOptions: any = {
    plugins: [dayGridPlugin],
    headerToolbar: {
      left: 'prev, next today',
      center: 'title',
      right: 'dayGridMonth, dayGridWeek, dayGridDay',
    },
    editable: true,
    navLinks: true,
    eventClick: function (info: any) {
      info.event.url;
    },
    displayEventTime: false,
  };

  constructor(private api: ApiService) {}

  eventValuesForProjects: any = (val: any) => {
    return {
      title: val.projectName,
      start: val.projectStartDate,
      end: val.projectEndDate,

      url: 'http://localhost:4200/project-detail/' + val.id,
      color: '#608494',
      textColor: 'white',
    };
  };

  eventValuesForTasks: any = (val: any) => {
    const datepipe: DatePipe = new DatePipe('en-ET');
    let formattedDate = datepipe.transform(val.taskDeadline, 'YYYY-MM-dd');
    return {
      title: val.taskName,
      start: formattedDate,
      url: 'http://localhost:4200/task-detail/' + val.id,
      color: '#a62ec4',
      textColor: 'white',
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
        ...this.calendarOptions,
        events: [...this.projectValues, ...this.taskValues],
      };
    }, 750);
  }
}
