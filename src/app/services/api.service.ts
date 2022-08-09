import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  postProject(data: any){
    return this.http.post<any>('http://localhost:3000/projectsList/', data);

  }

  getProject(){
    return this.http.get<any>('http://localhost:3000/projectsList');
  }

}
