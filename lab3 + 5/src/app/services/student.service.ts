import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from '../models/student.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StudentService {
  private api = 'http://localhost:4000/students';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Student[]> {
    return this.http.get<Student[]>(this.api);
  }

  create(student: Student): Observable<{ id: number }> {
    return this.http.post<{ id: number }>(this.api, student);
  }

  update(id: number, student: Student) {
    return this.http.put(`${this.api}/${id}`, student);
  }

  delete(id: number) {
    return this.http.delete(`${this.api}/${id}`);
  }
}
