import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(private http: HttpClient) { }

  private apiURL = environment.apiURL + '/ratings';

  public rate(movieId: number, rating: number){
    // ovdje umjesto klasičnog dto prosljeđuješ serveru propertije iz tog dto,
    // pogledaj si u ratingscontroller!
    // we are passing new object here so we can do it that way
    return this.http.post(this.apiURL, {movieId, rating});
  }
}
