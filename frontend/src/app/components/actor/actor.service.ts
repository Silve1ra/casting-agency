import { Injectable } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { HttpClient } from '@angular/common/http'
import { Actor } from './actor.model'
import { Observable, EMPTY } from 'rxjs'
import { map, catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class ActorService {
  baseUrl = 'http://localhost:5000/actors'

  constructor(private snackBar: MatSnackBar, private http: HttpClient) {}

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: isError ? ['msg-error'] : ['msg-success'],
    })
  }

  create(actor: Actor): Observable<Actor> {
    return this.http.post<Actor>(this.baseUrl, actor).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    )
  }

  read(): Observable<Actor[]> {
    return this.http.get<any>(this.baseUrl).pipe(
      map((obj) => obj.data),
      catchError((e) => this.errorHandler(e))
    )
  }

  readById(id: number): Observable<Actor> {
    const url = `${this.baseUrl}/${id}`
    return this.http.get<Actor>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    )
  }

  update(actor: Actor): Observable<Actor> {
    const url = `${this.baseUrl}/${actor.id}`
    return this.http.put<Actor>(url, actor).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    )
  }

  delete(id: number | undefined): Observable<Actor> {
    const url = `${this.baseUrl}/${id}`
    return this.http.delete<Actor>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    )
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage('An error has occurred!', true)
    return EMPTY
  }
}
