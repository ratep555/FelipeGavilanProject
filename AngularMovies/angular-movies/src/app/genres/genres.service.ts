import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GenreCreationDTO, GenreDTO } from './genres.model';

@Injectable({
  providedIn: 'root'
})
export class GenresService {

  constructor(private http: HttpClient) { }

  private apiURL = environment.apiURL + '/genres';

  getAll(): Observable<GenreDTO[]>{
    return this.http.get<GenreDTO[]>(this.apiURL);
  }

  getById(id: number): Observable<GenreDTO>{
    return this.http.get<GenreDTO>(`${this.apiURL}/${id}`);
  }

  create(genre: GenreCreationDTO){
    return this.http.post(this.apiURL, genre);
  }

  edit(id: number, genre: GenreCreationDTO){
    return this.http.put(`${this.apiURL}/${id}`, genre);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiURL}/${id}`);
  }
}
