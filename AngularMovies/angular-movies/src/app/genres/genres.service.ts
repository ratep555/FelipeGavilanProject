import { HttpClient } from '@angular/common/http';
import { getAllLifecycleHooks } from '@angular/compiler/src/lifecycle_reflector';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GenreCreationDTO, GenreDTO } from './genres.model';

@Injectable({
  providedIn: 'root'
})
export class GenresService {
  private apiURL = environment.apiURL + '/genres';

  constructor(private http: HttpClient) { }


getAll(): Observable<GenreDTO[]>{
return this.http.get<GenreDTO[]>(this.apiURL);
}

create(genre: GenreCreationDTO) {
  return this.http.post(this.apiURL, genre);
}
}
