import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent implements OnInit {
  addTaskButton() {
    let project = new AddTask('Helikunst', 'Arrange meeting with partner');
    console.log(project)
  }
  constructor() { }

  ngOnInit(): void {
  }

}

class AddTask {
  category: string;
  taskName: any;
  taskComment: any;
  deadline: any;
  constructor(_category: string, _taskName: any) {
    this.category = _category;
    this.taskName = _taskName;
    this.taskComment = "";
    this.deadline = "";
  }
}
