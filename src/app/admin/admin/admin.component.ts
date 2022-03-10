import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/database.service';
import { Candidate } from 'src/app/my-interfaces';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
})
export class AdminComponent implements OnInit {
  cand!:Candidate[]
  constructor(private dataService: DatabaseService, private router:Router) { }

  ngOnInit(): void {
    this.dataService.getAll().subscribe({
      next: res=>this.cand=res,
      error:(err)=>{
        console.log(err.error)
      }
    })
  }
  deleteCandidate(id:number,pos:number){
    this.dataService.deleteCandidate(id).subscribe({
      next:res => {
        console.log(res)
      },
      error:() => {},
      complete:()=>{
        this.cand.splice(pos,1);
      }
    })
  }
  logout(){
    this.dataService.logout().subscribe({
      next:()=>{
        this.router.navigate(['/'])
      }
    })
  }

}
