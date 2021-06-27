import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment as env } from '../../../environments/environment';

interface Message {
  message: string;
}

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
})
export class MoviesComponent implements OnInit {
  message: string = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  callApi(): void {
    this.http.get(`${env.dev.apiUrl}/`).subscribe((result: Message) => {
      this.message = result.message;
    });
  }

  callSecureMovies(): void {
    this.http.get(`${env.dev.apiUrl}/movies`).subscribe((result: Message) => {
      this.message = result.message;
    });
  }
}
