import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import {User } from '../my-interfaces';
import {deepCopy} from 'deep-copy-ts';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
})
export class UserComponent implements OnInit {
  candidate!: User
  candidateCopy!:User
  imageSrc!:any
  updateSrc!:any
  dep = true
  counties!:any
  cons: any;
  start = true;
  file !:any;
  photoInfo:{username:String, file:any} = {username:'',file:null}
  constructor(private dataService: DatabaseService) { }

  ngOnInit(): void {
    
    this.dataService.getCounties2().subscribe({
      next:res => {
        this.counties = res;
      },
      error: ()=>{},
      complete: () =>{
        this.dataService.getUser().subscribe({
          next:res => {
            this.candidate = res;
            this.imageSrc = res.candidates.photo;
          },
          error: ()=>{},
          complete: () => {
            this.getCons(this.candidate.candidates.countyId);
          }
        })
      }
    })
  }
  getCons(id:Number){
    this.cons = this.counties[Number(id)].constituency;
  }
  preview(event: any){
    const reader = new FileReader();
    if(event.target.files && event.target.files.length){
      const [file] = event.target.files;
      this.file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.updateSrc = reader.result as string;
      }
    }
  }
  changePhoto(form:NgForm){
    if(form.valid){
    if(this.file){
      this.photoInfo.username = this.candidate.username;
      this.photoInfo.file = this.file;
      // {username:this.candidate.username, file:this.file}
      this.dataService.updatePhoto(this.photoInfo).subscribe({
        next: ()=>{},
        error: ()=>{}
      })
    }
    return
  }
  }
  edit(){
    this.start = !this.start;
    if(!this.start){
      this.candidateCopy = deepCopy(this.candidate)
      this.updateSrc = this.candidateCopy.candidates.photo
    }
  }
  updateCandidate(){
    console.log(this.candidateCopy.candidates)
    this.dataService.updateUSer(this.candidateCopy.candidates).subscribe({
      next: res => {},
      error:err =>{}
    })
  }

}
