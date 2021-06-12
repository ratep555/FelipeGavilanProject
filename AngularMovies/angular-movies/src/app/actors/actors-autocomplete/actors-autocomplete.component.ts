import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-actors-autocomplete',
  templateUrl: './actors-autocomplete.component.html',
  styleUrls: ['./actors-autocomplete.component.css']
})
export class ActorsAutocompleteComponent implements OnInit {

  constructor() { }
  control: FormControl = new FormControl();
  // since this is only mattable, we can just say that
  @ViewChild(MatTable) table: MatTable<any>;

  actors = [
    {name: 'Tom Holland', picture: 'https://m.media-amazon.com/images/M/MV5BNTAzMzA3NjQwOF5BMl5BanBnXkFtZTgwMDUzODQ5MTI@._V1_UY317_CR23,0,214,317_AL_.jpg'},
    {name: 'Tom Hanks', picture: 'https://m.media-amazon.com/images/M/MV5BMTQ2MjMwNDA3Nl5BMl5BanBnXkFtZTcwMTA2NDY3NQ@@._V1_UY317_CR2,0,214,317_AL_.jpg'},
    {name: 'Samuel L. Jackson', picture: 'https://m.media-amazon.com/images/M/MV5BMTQ1NTQwMTYxNl5BMl5BanBnXkFtZTYwMjA1MzY1._V1_UX214_CR0,0,214,317_AL_.jpg'}
  ];

  selectedActors = [];



  originalActors = this.actors;
  columnsToDisplay = ['picture', 'name', 'character', 'actions'];

  ngOnInit(): void {
    // we can react to the changes in the formgroup/formcontrol
    // we are filtering
    this.control.valueChanges.subscribe(value => {
    // array of actors that is not filtered
    this.actors = this.originalActors;
    this.actors = this.actors.filter(actor => actor.name.indexOf(value) !== -1);
    });
  }

  optionSelected(event: MatAutocompleteSelectedEvent){
    console.log(event.option.value);
    this.selectedActors.push(event.option.value);
    this.control.patchValue('');
    if (this.table !== undefined){
      // hover over renderrows
      // with this we are telling mattable to refresh, display new value
      this.table.renderRows();
    }
  }

  remove(actor){
    const index = this.selectedActors.findIndex(a => a.name === actor.name);
    this.selectedActors.splice(index, 1);
    this.table.renderRows();
  }

  dropped(event: CdkDragDrop<any[]>){
    const previousIndex = this.selectedActors.findIndex(actor => actor === event.item.data);
    // hover over moveiteminarray (to je angular material function) and currentindex
    // ovo je array, prijašnja i sadašnja pozicija
    moveItemInArray(this.selectedActors, previousIndex, event.currentIndex);
    this.table.renderRows();
  }


}


