import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from '../database.service';
import { Candidate } from '../my-interfaces';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
})
export class CandidateListComponent implements OnInit {

  candidates !: Candidate[];
  pos!:String;
  area!:String;
  constructor(private router: Router, 
    private activatedRoute: ActivatedRoute,private dataService: DatabaseService) { }

  ngOnInit(): void {
    const areaId =  Number(this.activatedRoute.snapshot.paramMap.get('areaId'))
    if(!Number.isNaN(areaId)){
      switch (history.state.pos){
        case 'governors':
          this.pos = "Governors";
          this.area= history.state.area;
          this.dataService.getCountyPosition('governors',areaId).subscribe({
            next: res =>{
              this.candidates = res},
            error: ()=>{}
          })
          break;
        case 'senators':
          this.pos = "Senators";
          this.area= history.state.area;
            this.dataService.getCountyPosition('senators',areaId).subscribe({
              next: res =>{
                this.candidates = res
              },
              error: ()=>{}
            })
            break;
        case 'wr':
          this.pos = "Women Rep";
          this.area= history.state.area;
              this.dataService.getCountyPosition('wr',areaId).subscribe({
                next: res =>{
                  this.candidates = res;
                },
                error: ()=>{}
              })
              break;
        default:
          this.pos = "Member of Parliament";
          this.area= history.state.area;
          this.dataService.getCandidates(areaId).subscribe({
            next: res =>{
              this.candidates = res;},
            error: ()=>{}
          })
      }
    }
  }

}
