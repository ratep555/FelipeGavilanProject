import { Component, OnInit } from '@angular/core';
import { ActorDTO } from 'src/app/actors/actors.model';
import { GenreDTO } from '../genres.model';
import { GenresService } from '../genres.service';

@Component({
  selector: 'app-index-genres',
  templateUrl: './index-genres.component.html',
  styleUrls: ['./index-genres.component.css']
})
export class IndexGenresComponent implements OnInit {

  genres: GenreDTO[];

  columnsToDisplay = ['name', 'actions'];

  constructor(private genresService: GenresService) { }

  ngOnInit(): void {
   this.loadGenres();
  }

  loadGenres(){
    this.genresService.getAll().subscribe(genres => {
      this.genres = genres;
    });
  }

  delete(id: number){
    this.genresService.delete(id)
    .subscribe(() => {
      this.loadGenres();
    });
  }

}
