import { Component, OnInit } from '@angular/core';

// export interface Tile {
//   cols: number;
//   rows: number;
//   text: string;
// }

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // tiles: Tile[] = [
  //   {text: 'Resonare', cols: 3, rows: 1},
  //   {text: 'Concert Arrangement', cols: 1, rows: 2},
  //   {text: 'Project Management', cols: 1, rows: 1},
  //   {text: 'Trainings', cols: 2, rows: 1}
  // ];

  constructor() { }

  ngOnInit(): void {
  }

}
