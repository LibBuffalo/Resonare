import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { id } from 'date-fns/locale';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  postProject(data: any) {
    return this.http.post<any>('http://localhost:3000/projectsList/', data);
  }

  getProject(id: string) {
    return this.http.get(`http://localhost:3000/projectsList/${id}`);
  }

  getProjects() {
    return this.http.get<any>('http://localhost:3000/projectsList');
  }

  putProject(data: any, id: number) {
    return this.http.put<any>('http://localhost:3000/projectsList/' + id, data);
  }

  deleteProject(id: number) {
    return this.http.delete<any>('http://localhost:3000/projectsList/' + id);
  }

  getProjectDetails(id: number) {
    return this.http.get<any>('http://localhost:3000/projectsList/' + id);
  }

  postTask(data: any) {
    return this.http.post<any>('http://localhost:3000/tasksList/', data);
  }

  getTask(id: string) {
    return this.http.get(`http://localhost:3000/tasksList/${id}`);
  }

  getTasks() {
    return this.http.get<any>('http://localhost:3000/tasksList');
  }

  putTask(data: any, id: number) {
    return this.http.put<any>('http://localhost:3000/tasksList/' + id, data);
  }

  deleteTask(id: number) {
    return this.http.delete<any>('http://localhost:3000/tasksList/' + id);
  }

  getTaskDetails(id: number) {
    return this.http.get<any>('http://localhost:3000/tasksList/' + id);
  }

  projectIsCompleted(data: any) {
    return this.http.post<any>(
      'http://localhost:3000/completedProjects/',
      data
    );
  }
}
