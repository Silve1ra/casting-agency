import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private http: HttpClient) {}

  findAll(): Observable<any> {
    return this.http.get(`${env.dev.apiUrl}/movies`);
  }

  findOne(id: Number): Observable<any> {
    return this.http.get(`${env.dev.apiUrl}/movies/${id}`);
  }

  create(data): Observable<any> {
    return this.http.post(`${env.dev.apiUrl}/movies`, data);
  }

  update(id, data): Observable<any> {
    return this.http.patch(`${env.dev.apiUrl}/movies/${id}`, data);
  }

  delete(id): Observable<any> {
    return this.http.delete(`${env.dev.apiUrl}/movies/${id}`);
  }
}
