import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { Emitter } from '../emitters/emitter';
import { UserData } from '../my-interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  message = ''
  constructor(private userService: DatabaseService) { }

  ngOnInit(): void {
    this.userService.getUser().subscribe({
      next: (res) => {
        Emitter.authEmitter.emit(true)
      },
      error: (err) => {
        Emitter.authEmitter.emit(false)
      }
    })
  }

}
