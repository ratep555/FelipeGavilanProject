import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit {
  @Input() movies;
  constructor() { }

  ngOnInit(): void {
      }


  remove(index: number){
    // splice miče elemente, 1 je broj koliko miče
    this.movies.splice(index, 1);
  }

}
