import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, RouteReuseStrategy, RouterState } from '@angular/router';
import { DatabaseService } from '../database.service';
import { Emitter } from '../emitters/emitter';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  message!:String
  loginData:{email:String, password:String} = {
    email:'',
    password:''
  }

  constructor(private loginService: DatabaseService, private router: Router) { }

  ngOnInit(): void {
  }
  onSubmit(form: NgForm){
    if(form.valid){
      this.loginService.login(this.loginData).subscribe(
        {next:mess => {
        this.message = mess.message;
        console.log(this.message);
        Emitter.authEmitter.emit(true);
        this.router.navigate(['']);
      },error: err =>{
        console.error(err)
      }})
      this.router.navigate([''])
    }
  }

}
