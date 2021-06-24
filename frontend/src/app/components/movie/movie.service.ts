import { map, catchError } from 'rxjs/operators'
import { EMPTY } from 'rxjs'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Injectable } from '@angular/core'
import { Movie } from './movie.model'

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  baseUrl = 'http://localhost:5000/movies'

  constructor(private snackBar: MatSnackBar, private http: HttpClient) {}

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: isError ? ['msg-error'] : ['msg-success'],
    })
  }

  create(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(this.baseUrl, movie).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    )
  }

  read(): Observable<Movie[]> {
    return this.http.get<any>(this.baseUrl).pipe(
      map((obj) => obj.data),
      catchError((e) => this.errorHandler(e))
    )
  }

  readById(id: number): Observable<Movie> {
    const url = `${this.baseUrl}/${id}`
    return this.http.get<Movie>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    )
  }

  update(movie: Movie): Observable<Movie> {
    const url = `${this.baseUrl}/${movie.id}`
    return this.http.put<Movie>(url, movie).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    )
  }

  delete(id: number | undefined): Observable<Movie> {
    const url = `${this.baseUrl}/${id}`
    return this.http.delete<Movie>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    )
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage('An error has occurred!', true)
    return EMPTY
  }
}
