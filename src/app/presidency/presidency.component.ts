import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { Candidate } from '../my-interfaces';

@Component({
  selector: 'app-presidency',
  templateUrl: './presidency.component.html',
})
export class PresidencyComponent implements OnInit {
  candidates !: Candidate[]
  constructor(private dataService:DatabaseService) { }

  ngOnInit(): void {
    this.dataService.getPresident().subscribe({
      next:res =>{this.candidates = res},
      error:()=>{}
    });
  }

}
