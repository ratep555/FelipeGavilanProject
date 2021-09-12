import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatTable } from '@angular/material/table';
import { ActorsMovieDTO } from '../actors.model';
import { ActorsService } from '../actors.service';

@Component({
  selector: 'app-actors-autocomplete',
  templateUrl: './actors-autocomplete.component.html',
  styleUrls: ['./actors-autocomplete.component.css']
})
export class ActorsAutocompleteComponent implements OnInit {

  constructor(private actorsService: ActorsService) { }
  control: FormControl = new FormControl();
  // since this is only mattable, we can just say that
  @ViewChild(MatTable) table: MatTable<any>;

  @Input()
  selectedActors: ActorsMovieDTO[] = [];
  actorsToDisplay: ActorsMovieDTO[] = [];

  columnsToDisplay = ['picture', 'name', 'character', 'actions'];

  ngOnInit(): void {
    // we can react to the changes in the formgroup/formcontrol
    // sa valuechanges će se automatski izmjenjivati vrijednost kod search, to omogućuju reactiveforms
    // to je autocomplete, hover over valuechanges
    // this callback will be executed every time the user interacts with texbox of the template of the component
    this.control.valueChanges.subscribe(value => {
      this.actorsService.searchByName(value).subscribe(actors => {
        this.actorsToDisplay = actors;
      });
    });
  }

  optionSelected(event: MatAutocompleteSelectedEvent){
    console.log(event.option.value);
     // we want to always clean the textbox
    this.control.patchValue('');
     // ne želimo da možemo staviti dva identična glumca u listu
     // if the actor is already selected
    if (this.selectedActors.findIndex(x => x.id === event.option.value.id) !== -1){
      return;
    }

    this.selectedActors.push(event.option.value);
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


