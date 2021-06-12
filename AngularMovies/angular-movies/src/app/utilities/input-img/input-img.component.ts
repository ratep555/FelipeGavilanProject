import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { toBase64 } from '../utils';

@Component({
  selector: 'app-input-img',
  templateUrl: './input-img.component.html',
  styleUrls: ['./input-img.component.css']
})
export class InputImgComponent implements OnInit {
  imageBase64: string;
  @Input() urlCurrentImage: string;

  // when the user selects an image, we want to rise an event
  // we will send file to parent component
  @Output() ImageSelected = new EventEmitter<File>();

  constructor() { }

  ngOnInit(): void {
  }

  // we are receiving event
   change(event){
    if (event.target.files.length > 0){
      const file: File = event.target.files[0];
      toBase64(file).then((value: string) => this.imageBase64 = value);
      this.ImageSelected.emit(file);
      // if the user changes the image
      this.urlCurrentImage = null;
    }
  }
}
