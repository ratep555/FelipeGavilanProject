import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input-markdown',
  templateUrl: './input-markdown.component.html',
  styleUrls: ['./input-markdown.component.css']
})
export class InputMarkdownComponent implements OnInit {
  // whatever we write in textarea will be saved here with two way binding
  @Input() markdownContent = '';
  @Output() changeMarkdown = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

}
