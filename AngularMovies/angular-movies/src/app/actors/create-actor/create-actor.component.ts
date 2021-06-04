import { Component, OnInit } from '@angular/core';
import { ActorCreationDTO } from '../actors.model';
// import { actorCreationDTO } from '../actors.model';

@Component({
  selector: 'app-create-actor',
  templateUrl: './create-actor.component.html',
  styleUrls: ['./create-actor.component.css']
})
export class CreateActorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  saveChanges(actorCreationDTO: ActorCreationDTO){
    console.log(actorCreationDTO);
  }

}
