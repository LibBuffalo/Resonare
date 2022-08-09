import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PlanningComponent } from './planning/planning.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';

const routes: Routes = [
  { 
    path: 'projects',
    component: ProjectsListComponent,
    children: [
      {
        path: 'detail/:id',
        component: ProjectDetailComponent
      }
    ]
  },
  { 
    path: 'tasks',
    component: TasksListComponent, 
    children: [
      {
        path: 'detail/:id',
        component: TaskDetailComponent
      }
    ]
  },
  { 
    path: 'planning',
    component: PlanningComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
