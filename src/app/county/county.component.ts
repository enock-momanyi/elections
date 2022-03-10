
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from '../database.service';
import { CountyInt, Parl,Candidate } from '../my-interfaces';

@Component({
  selector: 'app-county',
  templateUrl: './county.component.html',
  styleUrls: ['./county.component.css']
})
export class CountyComponent implements OnInit {

  counties !: CountyInt[]
  cons!: Parl[]
  governors:any = []
  senators:any = []
  wr:any = []
  mp:any = []
  county_id=1
  // counties2!:Observable<CountyInt[]>
  constructor(private dataService: DatabaseService, private router: Router) { }

  ngOnInit(): void {
    // this.counties2 = this.dataService.getCounties()
    this.dataService.getCounties().subscribe({
      next: data => {
        this.counties = data
        this.cons = this.counties[0].constituency
        this.getCounty(0)
      },
      error:()=>{},
    })
    }
  getCons(id:Number){
    this.governors = []
    this.getCounty(id)
    this.county_id = Number(id) + 1
    this.cons = this.counties[Number(id)].constituency;
  }
  getCounty(id:Number){
    this.counties[Number(id)].constituency.forEach(val => {
      this.governors = this.governors.concat(val.candidates.filter(cand => {
        return cand.position === 'GOVERNOR';
      }))
    })
    this.counties[Number(id)].constituency.forEach(val => {
      this.senators = this.senators.concat(val.candidates.filter(cand => {
        return cand.position === 'SENATOR';
      }))
    })
    this.counties[Number(id)].constituency.forEach(val => {
      this.wr = this.wr.concat(val.candidates.filter(cand => {
        return cand.position === 'WOMEN REP';
      }))
    })
  }
  getMpCount(candidates: Candidate[]){
    return candidates.filter(cand =>{
      return cand.position === 'MP'
    }).length
  }
}
