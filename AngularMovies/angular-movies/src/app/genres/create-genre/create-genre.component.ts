import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { parseWebAPIErrors } from 'src/app/utilities/utils';
import { GenreCreationDTO } from '../genres.model';
import { GenresService } from '../genres.service';

@Component({
  selector: 'app-create-genre',
  templateUrl: './create-genre.component.html',
  styleUrls: ['./create-genre.component.css']
})
export class CreateGenreComponent implements OnInit {
  errors: string[] = [];

  constructor(private router: Router, private genresService: GenresService) { }

  ngOnInit(): void {
  }

  saveChanges(genreCreationDTO: GenreCreationDTO){
    // A callback is a function passed as an argument to another function
   // This technique allows a function to call another function
   // dakle sa ovom funkcijom, callback funkcijom() =>, zoveš drugu funkciju?
    this.genresService.create(genreCreationDTO).subscribe(() => {
      this.router.navigate(['/genres']);
      // we are creating logic to parse errors from api and put them in string array koji je gore
    }, error => this.errors = parseWebAPIErrors(error));
  }


}




