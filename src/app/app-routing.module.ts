import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PlanningComponent } from './planning/planning.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';

const routes: Routes = [
  { 
    path: 'projects',
    component: ProjectsListComponent,
    children: [
      // {
      //   path: 'detail/:id',
      //   component: ProjectDetailComponent
      // },
      // {
      //   path: 'sidenav/:id',
      //   component: SidenavComponent
      // }
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
  },
  { 
    path: 'sidenav',
    component: SidenavComponent
  },
  {
    path: 'project-detail/:id',
    component: ProjectDetailComponent
  },
  {
    path: 'home',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
