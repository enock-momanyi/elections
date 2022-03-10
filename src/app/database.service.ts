import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Candidate, CountyInt, Parl, UserData } from './my-interfaces';
@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private url = '/api/status';
  private httpOptions = {
    withCredentials:true
  }
  constructor(private http: HttpClient) { }

  getData(): Observable<{status: string}>{
    return this.http.get<{status: string}>(this.url);
  }
  getCounties(): Observable<CountyInt[]>{
    return this.http.get<CountyInt[]>('/api/counties', this.httpOptions)
  }
  getCounties2(): Observable<CountyInt[]>{
    return this.http.get<CountyInt[]>('/api/allcounties', this.httpOptions)
  }
  getConstituencies(id:number): Observable<Parl[]>{
    return this.http.get<Parl[]>(`/api/constituencies/${id}`, this.httpOptions)
  }
  getCandidates(id:number): Observable<Candidate[]>{
    return this.http.get<Candidate[]>(`/api/constituency/${id}`, this.httpOptions)
  }
  getAll(): Observable<Candidate[]>{
    return this.http.get<Candidate[]>(`/api/allcandidates`, this.httpOptions)
  }
  getCountyPosition(pos: String, id:number): Observable<any>{
    return this.http.get(`/api/${pos}/${id}`,this.httpOptions)
  }
  addUser(userData: UserData): Observable<any>{
    const formData = new FormData();
    const js = Object.entries(userData)
    for(let i in js){
      const pair = js[i]
      if(pair[0] !== 'file'){
      formData.append(pair[0],pair[1])
      }else{
        if(pair[1]){
        formData.append(pair[0],pair[1], pair[1].name)
        }
      }
    }
   return this.http.post('/api/candidate',formData,this.httpOptions)
  }
  
  login(userData:{email:String,password:String}): Observable<any>{
    return this.http.post('/api/login',userData,this.httpOptions)
  }
  logout(): Observable<any>{
    return this.http.post('/api/logout',{},this.httpOptions)
  }
  getUser():Observable<any>{
    return this.http.get('/api/user',this.httpOptions);
  }
  getAccount():Observable<any>{
    return this.http.get('/api/account',this.httpOptions);
  }
  getPresident():Observable<any>{
    return this.http.get('/api/president', this.httpOptions);
  }
  imageUpload(file:File): Observable<any>{
    const formData = new FormData();
    formData.append('file',file, file.name)
    console.log(formData)
    return this.http.post('/api/uploadedfile', formData, this.httpOptions)
  }
  updateUSer(data: Omit<UserData,"email"|"password"|"file"|"username">):Observable<any>{
    // const formData = new FormData();
    // const js = Object.entries(data)
    // for(let i in js){
    //   const pair = js[i]
    //   formData.append(pair[0],String(pair[1]))
    //   }
    
    return this.http.put('/api/user',data,this.httpOptions)
  }
  updateAccount(data:{username:String, email:String}):Observable<any>{
    return this.http.put('/api/account',data, this.httpOptions)
  }
  updatePassword(data:any):Observable<any>{
    return this.http.put('/api/password',data, this.httpOptions)
  }
  updatePhoto(data:{username:String, file:any}): Observable<any>{
    const formData = new FormData();
    const js = Object.entries(data)
    for(let i in js){
      const pair = js[i]
      if(pair[0] === 'file'){
      formData.append(pair[0],pair[1], pair[1].name);
      }else{
        formData.append(pair[0],pair[1])
      }
    }
    
    return this.http.put('/api/photo',formData,this.httpOptions)
  }
  deleteCandidate(id:Number){
    return this.http.delete(`/api/candidate/${id}`,this.httpOptions)
  }
  isLoggedin(): Observable<{status:boolean}>{
    return this.http.get<{status:boolean}>('/api/isloggedin',this.httpOptions);
  }
}
