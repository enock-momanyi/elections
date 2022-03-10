import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AdministratorService } from '../administrator.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginAdminComponent implements OnInit {
  loginData:{email:String, password:String} = {
    email:'',
    password:''
  }
  constructor(private loginService: AdministratorService, private router:Router) { }

  ngOnInit(): void {
  }
  onSubmit(form: NgForm){
    if(form.valid){
      this.loginService.login(this.loginData).subscribe(
        {next:res => {
          this.router.navigate(['admin']);
      },error: err =>{
        console.error(err)
      }})
      this.router.navigate(['admin'])
    }
  }
}
