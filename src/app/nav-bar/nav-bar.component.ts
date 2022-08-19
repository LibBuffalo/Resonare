import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  constructor(private dialog: MatDialog) {}
  openDialogLogin() {
    this.dialog.open(LoginComponent, {
      width: '30%',
    });
  }

  ngOnInit(): void {}
}
