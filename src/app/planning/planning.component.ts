import { Component } from '@angular/core';
import {
  CalendarOptions,
  defineFullCalendarElement,
} from '@fullcalendar/web-component';
import dayGridPlugin from '@fullcalendar/daygrid';
import { ApiService } from '../services/api.service';

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
  Events: any[] = [];

  eventValuesForProjects: any = (val: any) => {
    return {
      title: val.projectName,
      start: val.projectStartDate,
    };
  };

  eventValuesForTasks: any = (val: any) => {
    return {
      title: val.taskName,
      start: val.taskDeadline,
    };
  };

  getAllValuesForProjectsEvents() {
    this.api.getProjects().subscribe({
      next: (res) => {
        this.projectsResponse = res;
        this.projectValues = this.projectsResponse.map(
          this.eventValuesForProjects
        );
        console.log(this.projectValues);
      },
    });
  }

  getAllValuesForTasksEvents() {
    this.api.getTasks().subscribe({
      next: (res) => {
        this.tasksResponse = res;
        this.taskValues = this.tasksResponse.map(this.eventValuesForTasks);
        console.log(this.taskValues);
      },
      error: (err) => {
        alert('Error while fetching the Tasks data!');
      },
    });
  }

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    headerToolbar: {
      left: 'prev, next today',
      center: 'title',
      right: 'dayGridMonth, dayGridWeek, dayGridDay',
    },
    // events: [
    //   { title: 'Test Event', start: '2022-08-20', allDay: true },
    //   { title: 'Second Event', start: '2022-08-23', allDay: true },
    // ],
    events: this.projectValues,
  };

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.getAllValuesForTasksEvents();
    this.getAllValuesForProjectsEvents();
    console.log(this.projectValues);
    setTimeout(() => console.log(this.calendarOptions), 3000);
  }
}
