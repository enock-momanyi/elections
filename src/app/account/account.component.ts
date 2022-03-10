import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
})
export class AccountComponent implements OnInit {

  accountDetails !: {username: String, email:String}
  password : {oldPass:String, newPas:String} = {oldPass:'',newPas:''}
  message!:any
  constructor(private accountService: DatabaseService) { }

  ngOnInit(): void {
    this.accountService.getAccount().subscribe({
      next: acc => this.accountDetails = acc,
      error: ()=>{}
    })
  }
  update(){
    this.accountService.updateAccount(this.accountDetails).subscribe(
      {next: ()=>{},
      error: ()=>{}}
    )
  }
  passUpdate(){
    this.accountService.updatePassword(this.password).subscribe({
      next: res => {this.message = res},
      error: err => {this.message=err}
    })
  }

}
