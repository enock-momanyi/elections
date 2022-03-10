import { Component, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { DatabaseService } from '../database.service';
import { CountyInt, Parl, UserData } from '../my-interfaces';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
})
export class SignupComponent implements OnInit {
  @Input()
   counties !: CountyInt[];
   cons!: Observable<Parl[]>;
   counties2 !: Observable<CountyInt[]>;
   dep: boolean = true;
   file !: File;
  userData: UserData = {
    username: '',
    firstname: '',
    middlename: '',
    lastname:'',
    alias: '',
    bio:'',
    email: '',
    party: '',
    position: '',
    deputy: '',
    countyId: 0,
    constituencyId: 0,
    password: '',
    file: null
  }
  res !: any;
  constructor(private dataService: DatabaseService) { }

  ngOnInit(): void {
    // this.counties2 = this.dataService.getCounties()
    this.dataService.getCounties().subscribe({
      next: data => {
        this.counties = data
        // this.cons = this.counties[0].constituency
      },
      error: err => console.error(err)
    })
  
 }
  getCons(id:Number){
    this.cons = of(this.counties[Number(id)].constituency);
  }
  onSubmit(form: NgForm){
    this.dep = false
    if((this.userData.position === 'PRESIDENT' || this.userData.position === 'GOVERNOR') && !this.userData.deputy.length){
      this.dep = !this.dep;
      return
    }else{
    if(form.valid){
      const formData = new FormData();
      this.userData.file = this.file
      this.dataService.addUser(this.userData).subscribe({
        next: ()=>{},
        error: ()=>{}
      })
    }
  }
    // this.dataService.imageUpload(this.file).subscribe({
    //   next: res => {console.log(res)},
    //   error: err => {console.error(err)}
    // })
    
  }
  upload(){
    document.getElementById('file')?.click()

  }
  preview(event: any){
    const reader = new FileReader();
    if(event.target.files && event.target.files.length){
      const [file] = event.target.files;
      this.file = event.target.files[0];
      
      reader.readAsDataURL(file);
      reader.onload = () => {
        const img = document.createElement('img');
        const output = document.getElementById('upload_avatar')
        img.src = reader.result as string;
        if(output){
          let svg = output.childNodes.item(1);
           output.replaceChild(img,svg)
        }
      }
    }
  }
}
