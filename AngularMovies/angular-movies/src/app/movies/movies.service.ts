import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { formatDateFormData } from '../utilities/utils';
import { HomeDTO, MovieCreationDTO, MovieDTO, MoviePostGetDTO, MoviePutGetDTO } from './movies.model';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http: HttpClient) { }
  private apiURL = environment.apiURL + '/movies';

  public getHomePageMovies(): Observable<HomeDTO>{
    return this.http.get<HomeDTO>(this.apiURL);
  }

  public putGet(id: number): Observable<MoviePutGetDTO>{
    return this.http.get<MoviePutGetDTO>(`${this.apiURL}/putget/${id}`);
  }

  public edit(id: number, movieCreationDTO: MovieCreationDTO){
    const formData = this.BuildFormData(movieCreationDTO);
    return this.http.put(`${this.apiURL}/${id}`, formData);
  }




  public postGet(): Observable<MoviePostGetDTO>{
    // we are deserialising into moviepostgetdto
    return this.http.get<MoviePostGetDTO>(`${this.apiURL}/postget`);
  }

  public getById(id: number): Observable<MovieDTO>{
    return this.http.get<MovieDTO>(`${this.apiURL}/${id}`);
  }

  public filter(values: any): Observable<any>{
    // we are transforming values in httpparams
    const params = new HttpParams({fromObject: values});
    return this.http.get<MovieDTO[]>(`${this.apiURL}/filter`, {params, observe: 'response'});
  }

  // ovdje si mijenjao kao na snimci!
  public create(movieCreationDTO: MovieCreationDTO): Observable<number> {
    const formData = this.BuildFormData(movieCreationDTO);
    return this.http.post<number>(this.apiURL, formData);
  }

  public delete(id: number){
    return this.http.delete(`${this.apiURL}/${id}`);
  }

  // we need this because of fromform in our controller
  private BuildFormData(movie: MovieCreationDTO): FormData {
    const formData = new FormData();

    formData.append('title', movie.title);
    formData.append('summary', movie.summary);
    formData.append('trailer', movie.trailer);
    // this is bool, so we have to cast with String
    formData.append('inTheaters', String(movie.inTheaters));
    if (movie.releaseDate){
      formData.append('releaseDate', formatDateFormData(movie.releaseDate));
    }

    if (movie.poster){
      formData.append('poster', movie.poster);
    }

    formData.append('genresIds', JSON.stringify(movie.genresIds));
    formData.append('movieTheatersIds', JSON.stringify(movie.movieTheatersIds));
    formData.append('actors', JSON.stringify(movie.actors));

    return formData;
  }
}







