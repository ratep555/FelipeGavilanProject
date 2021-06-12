import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { firstLetterUppercase } from 'src/app/validators/firstLetterUpperCase';
import { GenreCreationDTO } from '../genres.model';

@Component({
  selector: 'app-form-genre',
  templateUrl: './form-genre.component.html',
  styleUrls: ['./form-genre.component.css']
})
export class FormGenreComponent implements OnInit {
  @Input() model: GenreCreationDTO;
  form: FormGroup;
  @Output() SaveyChanges: EventEmitter<GenreCreationDTO> = new EventEmitter<GenreCreationDTO>();


  constructor(private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
       name: ['', {
         validators: [Validators.required, Validators.minLength(3)/* , firstLetterUppercase() */]
        }]
    });

    if (this.model !== undefined) {
      this.form.patchValue(this.model);
    }
  }

  saveChanges(){
this.SaveyChanges.emit(this.form.value);
  }

  getErrorMessageFieldName() {
    const field = this.form.get('name');

    if (field.hasError('required'))  {
    return 'The name field is required';
    }

    if (field.hasError('minlength')) {
      return 'The minimum length is 3';
    }
// ovo je custom error validator iz firstLetterUppercase.ts
    if (field.hasError('firstLetterUppercase')) {
      return field.getError('firstLetterUppercase').message;
    }

    return '';

  }


}
