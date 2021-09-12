import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActorsMovieDTO } from 'src/app/actors/actors.model';
import { MultipleSelectorModel } from 'src/app/utilities/multiple-selector/multiple-selector.model';
import { MovieCreationDTO, MovieDTO } from '../movies.model';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css']
})
export class EditMovieComponent implements OnInit {
  model: MovieDTO;
  selectedGenres: MultipleSelectorModel[];
  nonSelectedGenres: MultipleSelectorModel[];
  selectedMovieTheaters: MultipleSelectorModel[];
  nonSelectedMovieTheaters: MultipleSelectorModel[];
  selectedActors: ActorsMovieDTO[];


 /*  = {title: 'Spider-Man', inTheaters: true, summary: 'whatever',
  releaseDate: new Date(), trailer: 'ABCDE',
  poster: 'https://m.media-amazon.com/images/M/MV5BNTk4ODQ1MzgzNl5BMl5BanBnXkFtZTgwMTMyMzM4MTI@._V1_UX182_CR0,0,182,268_AL_.jpg'};

 */
  constructor(private activatedRoute: ActivatedRoute,
              private moviesService: MoviesService,
              private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.moviesService.putGet(params.id).subscribe(putGetDTO => {
        this.model = putGetDTO.movie;

        this.selectedGenres = putGetDTO.selectedGenres.map(genre => {
          return {key: genre.id, value: genre.name} as MultipleSelectorModel;
        });

        this.nonSelectedGenres = putGetDTO.nonSelectedGenres.map(genre => {
          return {key: genre.id, value: genre.name} as MultipleSelectorModel;
        });

        this.selectedMovieTheaters = putGetDTO.selectedMovieTheaters.map(movieTheater => {
          return {key: movieTheater.id, value: movieTheater.name} as MultipleSelectorModel;
        });

        this.nonSelectedMovieTheaters = putGetDTO.nonSelectedMovieTheaters.map(movieTheater => {
          return {key: movieTheater.id, value: movieTheater.name} as MultipleSelectorModel;
        });

        this.selectedActors = putGetDTO.actors;

    });
    });
  }

  saveChanges(movieCreationDTO: MovieCreationDTO){
    this.moviesService.edit(this.model.id, movieCreationDTO).subscribe(() => {
      this.router.navigate(['/movie/' + this.model.id]);
    });
  }

}
