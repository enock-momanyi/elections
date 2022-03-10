import { HttpClient } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdministratorService {
  private httpOptions = {
    withCredentials:true
  };
  constructor(private http:HttpClient) { };
  login(userData:{email:String,password:String}): Observable<any>{
    return this.http.post('/api/admin/login',userData,this.httpOptions);
  }
  logout(): Observable<any>{
    return this.http.post('/api/logout',{},this.httpOptions)
  }
  isAdminLoggedIn():Observable<{status:boolean}>{
    return this.http.get<{status:boolean}>('/api/adminloggedin');
  }
  deleteCandidate(id:Number){
    return this.http.delete(`/api/candidate/${id}`,this.httpOptions)
  }
}
