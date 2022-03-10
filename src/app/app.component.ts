import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DatabaseService } from './database.service';
import { Emitter } from './emitters/emitter';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'elections';
  is_loggedin=false;
  sub!:Subscription;
  constructor(private dataService: DatabaseService, private router: Router){
    this.sub = router.events.subscribe((event) => {
      if(event instanceof NavigationStart){
        if(!router.navigated){
          this.dataService.isLoggedin().subscribe({
            next: res => Emitter.authEmitter.emit(res.status),
            error: () => Emitter.authEmitter.emit(false)
          });
        }
      }
    })
  }
  ngOnInit(): void {
    Emitter.authEmitter.subscribe(
      (log: boolean) => {
        this.is_loggedin=log;
      }
    )
  }
  logout(){
    this.dataService.logout().subscribe({
      next: () => {
        Emitter.authEmitter.emit(false);
        this.router.navigate(['/']);
      }
    })
  }
}
