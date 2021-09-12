import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MovieTheatersCreationDTO, MovieTheatersDTO } from './movie-theaters.model';

@Injectable({
  providedIn: 'root'
})
export class MovieTheatersService {

  constructor(private http: HttpClient) { }

  private apiURL = environment.apiURL + '/movieTheaters';

  public get(): Observable<MovieTheatersDTO[]>{
    return this.http.get<MovieTheatersDTO[]>(this.apiURL);
  }

  public getById(id: number): Observable<MovieTheatersDTO>{
    return this.http.get<MovieTheatersDTO>(`${this.apiURL}/${id}`);
  }

  public create(movieTheaterDTO: MovieTheatersCreationDTO){
    return this.http.post(this.apiURL, movieTheaterDTO);
  }

  public edit(id: number, movieTheaterDTO: MovieTheatersCreationDTO){
    return this.http.put(`${this.apiURL}/${id}`, movieTheaterDTO);
  }

  public delete(id: number){
    return this.http.delete(`${this.apiURL}/${id}`);
  }

}
