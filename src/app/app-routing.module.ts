import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PlanningComponent } from './planning/planning.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';

const routes: Routes = [
  { path: 'projects', component: ProjectsListComponent },
  { path: 'tasks', component: TasksListComponent },
  { path: 'planning', component: PlanningComponent },
  { path: 'sidenav', component: SidenavComponent },
  { path: 'project-detail/:id', component: ProjectDetailComponent },
  { path: 'home', component: HomeComponent },
  { path: 'task-detail/:id', component: TaskDetailComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
