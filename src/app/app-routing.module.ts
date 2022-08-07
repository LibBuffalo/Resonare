import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlanningComponent } from './planning/planning.component';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';

const routes: Routes = [
  {path: 'projects-list', component:ProjectsListComponent},
  {path: 'tasks-list', component:TasksListComponent},
  {path: 'planning', component:PlanningComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
