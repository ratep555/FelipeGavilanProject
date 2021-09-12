import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MultipleSelectorModel } from 'src/app/utilities/multiple-selector/multiple-selector.model';
import { MovieCreationDTO } from '../movies.model';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-create-movie',
  templateUrl: './create-movie.component.html',
  styleUrls: ['./create-movie.component.css']
})
export class CreateMovieComponent implements OnInit {

  constructor(private moviesService: MoviesService, private router: Router) { }

  nonSelectedGenres: MultipleSelectorModel[];
  nonSelectedMovieTheaters: MultipleSelectorModel[];


  ngOnInit(): void {
    this.moviesService.postGet().subscribe(response => {
      this.nonSelectedGenres = response.genres.map(genre => {
        // we are mapping from genres to nonselected genres
        return  {key: genre.id, value: genre.name} as MultipleSelectorModel;
      });

      this.nonSelectedMovieTheaters = response.movieTheaters.map(movieTheater => {
        return  {key: movieTheater.id, value: movieTheater.name} as MultipleSelectorModel;
      });

    });
  }


  saveChanges(movieCreationDTO: MovieCreationDTO){
    console.log(movieCreationDTO);
    this.moviesService.create(movieCreationDTO).subscribe(id => {
      this.router.navigate(['/movie/' + id]);
    });
  }
}
