import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActorsMovieDTO } from 'src/app/actors/actors.model';
import { MultipleSelectorModel } from 'src/app/utilities/multiple-selector/multiple-selector.model';
import { MovieCreationDTO, MovieDTO } from '../movies.model';

@Component({
  selector: 'app-form-movie',
  templateUrl: './form-movie.component.html',
  styleUrls: ['./form-movie.component.css']
})
export class FormMovieComponent implements OnInit {
  @Input()
  model: MovieDTO;

  @Output()
  SaveyChanges = new EventEmitter<MovieCreationDTO>();

  @Input() nonSelectedGenres: MultipleSelectorModel[] = [];

  @Input()
  selectedGenres: MultipleSelectorModel[] = [];

  @Input() nonSelectedMovieTheaters: MultipleSelectorModel[] = [];

  @Input()
  selectedMovieTheaters: MultipleSelectorModel[] = [];

  @Input()
  selectedActors: ActorsMovieDTO[] = [];

  constructor(private formBuilder: FormBuilder) { }

  form: FormGroup;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: ['', {
        validators: [Validators.required]
      }],
      summary: '',
      inTheaters: false,
      trailer: '',
      releaseDate: '',
      poster: '',
      genresIds: '',
      movieTheatersIds: '',
      actors: ''
    });

    if (this.model !== undefined){
    this.form.patchValue(this.model);
    }
  }

  saveChanges(){
    // we want to get id of the selected genres and put that into formgroup
    // we want to map selectedgenres array into array of numbers
    const genresIds = this.selectedGenres.map(value => value.key);
    this.form.get('genresIds').setValue(genresIds);

    const movieTheatersIds = this.selectedMovieTheaters.map(value => value.key);
    this.form.get('movieTheatersIds').setValue(movieTheatersIds);

    const actors = this.selectedActors.map(val => {
      return {id: val.id, character: val.character};
    });
    this.form.get('actors').setValue(actors);

    this.SaveyChanges.emit(this.form.value);
  }

  onImageSelected(file: File){
    this.form.get('poster').setValue(file);
  }

  changeMarkdown(content: string){
    this.form.get('summary').setValue(content);
  }

}


