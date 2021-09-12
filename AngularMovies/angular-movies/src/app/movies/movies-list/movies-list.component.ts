import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit {
  @Input() movies;

  @Output()
  onDelete = new EventEmitter<void>();
  constructor(private moviesService: MoviesService) { }

  ngOnInit(): void {
      }


      remove(id: number){
        this.moviesService.delete(id).subscribe(() => {
          // we are informing the parent component (home component) the movie has been deleted
          this.onDelete.emit();
        });
      }
}
