import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActorDTO } from '../actors.model';
import { ActorsService } from '../actors.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-index-actors',
  templateUrl: './index-actors.component.html',
  styleUrls: ['./index-actors.component.css']
})
export class IndexActorsComponent implements OnInit {
  actors: ActorDTO[];
  columnsToDisplay = ['name', 'actions'];
  totalAmountOfRecords;
  currentPage = 1;
  pageSize = 5;

  constructor(private actorsService: ActorsService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.actorsService.get(this.currentPage, this.pageSize).subscribe((response: HttpResponse<ActorDTO[]>) => {
      this.actors = response.body;
      this.totalAmountOfRecords = response.headers.get('totalAmountOfRecords');
    });
  }

  updatePagination(event: PageEvent){
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadData();
  }

  delete(id: number){
    this.actorsService.delete(id).subscribe(() => {
      this.loadData();
    });
  }


}


