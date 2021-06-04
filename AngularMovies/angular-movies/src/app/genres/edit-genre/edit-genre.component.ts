import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GenreCreationDTO } from '../genres.model';

@Component({
  selector: 'app-edit-genre',
  templateUrl: './edit-genre.component.html',
  styleUrls: ['./edit-genre.component.css']
})
export class EditGenreComponent implements OnInit {
  model: GenreCreationDTO = {name: 'Drama'};

  constructor(private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
    });
  }

  saveChanges(genreCreationDTO: GenreCreationDTO){
    // ... save the genre
    console.log(genreCreationDTO);

    this.router.navigate(['/genres']);
  }

}
