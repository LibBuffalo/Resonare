import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule} from '@angular/material/button';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MatDividerModule} from '@angular/material/divider';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { PlanningComponent } from './planning/planning.component'

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ProjectsListComponent,
    TasksListComponent,
    PlanningComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDividerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
