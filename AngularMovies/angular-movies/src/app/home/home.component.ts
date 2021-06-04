import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  moviesInTheaters;
  moviesFutureReleases;
  title = 'any value';
  display = true;

  constructor() { }


  ngOnInit(): void {
    this.moviesInTheaters = [{
      title: 'Spider-Man',
      releaseDate: new Date(),
      price: 1400.99,
      poster: 'https://www.tehix.hr/wp-content/uploads/2019/07/Spider-Man-Far-From-Home-RECENZIJA-tehix.jpg'
    },
    {
      title: 'Moana',
      releaseDate: new Date('2016-11-14'),
      price: 300.99,
      poster: 'https://cdn.vox-cdn.com/thumbor/hyA560LW9lkdyANSqeLc3kK8oJw=/0x0:1920x800/1200x800/filters:focal(506x118:812x424)/cdn.vox-cdn.com/uploads/chorus_image/image/52005641/MoanaPortrait.0.jpeg'
    }
  ];

    this.moviesFutureReleases = [];
  }
// we are receiving this.selectedRate from child component - rating.component
  handleRating(rate: number){
    alert(`The user selected ${rate}`);
  }

}
