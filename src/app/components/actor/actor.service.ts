import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ActorService {
  constructor(private http: HttpClient) {}

  findAll(): Observable<any> {
    return this.http.get(`${env.dev.apiUrl}/actors`);
  }

  findOne(id: Number): Observable<any> {
    return this.http.get(`${env.dev.apiUrl}/actors/${id}`);
  }

  create(data): Observable<any> {
    return this.http.post(`${env.dev.apiUrl}/actors`, data);
  }

  update(id, data): Observable<any> {
    return this.http.put(`${env.dev.apiUrl}/${id}`, data);
  }

  async delete(id): Promise<any> {
    return this.http.delete(`${env.dev.apiUrl}/${id}`);
  }
}
