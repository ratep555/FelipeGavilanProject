import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GenreDTO } from 'src/app/genres/genres.model';
import { GenresService } from 'src/app/genres/genres.service';
import { MovieDTO } from '../movies.model';
import { MoviesService } from '../movies.service';
import {Location} from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-movie-filter',
  templateUrl: './movie-filter.component.html',
  styleUrls: ['./movie-filter.component.css']
})
export class MovieFilterComponent implements OnInit {

  // location alows us to edit whats in url, to interact with it, kada utipkamo npr moana da to pokaže u url
  constructor(private formBuilder: FormBuilder,
              private moviesService: MoviesService,
              private genresService: GenresService,
              private location: Location,
              private activatedRoute: ActivatedRoute) { }

 form: FormGroup;

  genres: GenreDTO[];

  movies: MovieDTO[];
  currentPage = 1;
  recordsPerPage = 10;
  initialFormValues: any;
  totalAmountOfRecords;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: '',
      genreId: 0,
      upcomingReleases: false,
      inTheaters: false
    });

    this.initialFormValues = this.form.value;
    this.readParametersFromURL();

    this.genresService.getAll().subscribe(genres => {
      this.genres = genres;
    });

    this.filterMovies(this.form.value);

// sa valuechanges će se automatski izmjenjivati vrijednost kod search, to omogućuju reactiveforms
// when we subscribe, we react to any change our form recieves
// values are values of the form, baš kao i kad subscribamo kod servera
    this.form.valueChanges
      .subscribe(values => {
        // this is just a trick to reset the movies
        this.filterMovies(values);
        // sa ovim se i u url mijenja vrijednost dok pišeš u searchinput
        this.writeParametersInURL();
      });


  }



  // values dobijaš iz forms
  filterMovies(values: any){
    values.page = this.currentPage;
    values.recordsPerPage = this.recordsPerPage;
    this.moviesService.filter(values).subscribe((response: HttpResponse<MovieDTO[]>) => {
      this.movies = response.body;
      this.totalAmountOfRecords = response.headers.get('totalAmountOfRecords');
    });
  }
  // sa ovim nakon refreshanja sve ostaje i u url i na naslovnici u chromu
  private readParametersFromURL(){
    // hover over queryparams
    this.activatedRoute.queryParams.subscribe(params => {
      const obj: any = {};
     // if there is a title in querystring
      if (params.title){
        obj.title = params.title;
      }

      if (params.genreId){
        obj.genreId = Number(params.genreId);
      }

      if (params.upcomingReleases){
        obj.upcomingReleases = params.upcomingReleases;
      }

      if (params.inTheaters){
        obj.inTheaters = params.inTheaters;
      }

      if (params.page){
        this.currentPage = params.page;
      }

      if (params.recordsPerPage){
        this.recordsPerPage = params.recordsPerPage;
      }

      this.form.patchValue(obj);
    });
  }


  clearForm(){
    this.form.patchValue(this.initialFormValues);
    }

   // we are creating querystring that we will put in the url with the help of location
    private writeParametersInURL(){
      const queryStrings = [];
      const formValues = this.form.value;

      if (formValues.title){
        queryStrings.push(`title=${formValues.title}`);
      }

      if (formValues.genreId !== '0'){
        queryStrings.push(`genreId=${formValues.genreId}`);
      }

      if (formValues.upcomingReleases){
        queryStrings.push(`upcomingReleases=${formValues.upcomingReleases}`);
      }

      if (formValues.inTheaters){
        queryStrings.push(`inTheaters=${formValues.inTheaters}`);
      }

      queryStrings.push(`page=${this.currentPage}`);
      queryStrings.push(`recordsPerPage=${this.recordsPerPage}`);
      // hover over replacestate
      this.location.replaceState('movies/filter', queryStrings.join('&'));
    }

    paginatorUpdate(event: PageEvent){
      this.currentPage = event.pageIndex + 1;
      this.recordsPerPage = event.pageSize;
      this.writeParametersInURL();
      this.filterMovies(this.form.value);
    }

    onDelete(){
      this.filterMovies(this.form.value);
    }
}


