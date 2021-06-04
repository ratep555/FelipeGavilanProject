import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
  @Input() maxRating = 5;
  // it has to be an input because it has to be a parameter so our component
  // will be able to say - the previous value selected by the user
  @Input() selectedRate = 0;
  // we want parent component to know about the selection we did here
  // we are using output for that purpose, ovako će nas obaviještavati koju je ocjenu user odabrao
  @Output() Rating: EventEmitter<number> = new EventEmitter<number>();
  previousRate = 0;
  maxRatingArr = [];

  constructor() { }


  ngOnInit(): void {
    this.maxRatingArr = Array(this.maxRating).fill(0);
  }

  handleMouseEnter(index: number){
    this.selectedRate = index + 1;
  }

  handleMouseLeave(){
    if (this.previousRate !== 0){
      this.selectedRate = this.previousRate;
    } else{
      this.selectedRate = 0;
    }
  }

  rate(index: number){
    this.selectedRate = index + 1;
    this.previousRate = this.selectedRate;
    this.Rating.emit(this.selectedRate);
  }

}



