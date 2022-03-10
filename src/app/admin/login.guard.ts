import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { AdministratorService } from './administrator.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private router:Router, private adminService:AdministratorService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {;
      let subject = new Subject<boolean>();
      this.adminService.isAdminLoggedIn().subscribe({
        next: res => {
          subject.next(res.status);
          if(!res.status){
            this.router.navigate(['admin/login']);
          }
        },error: () => {subject.next(false)},
      });
      return subject.asObservable();
  }
  
}
