import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-read',
  templateUrl: './movie-read.component.html',
  styleUrls: ['./movie-read.component.css'],
})
export class MovieReadComponent implements OnInit {
  movies: any;

  constructor(
    private router: Router,
    public auth: AuthService,
    public movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.readMovies();
  }

  readMovies(): void {
    this.movieService.findAll().subscribe(
      (movies) => {
        this.movies = movies.data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  navigateToProductCreate(): void {
    this.router.navigate(['/movies/create']);
  }
}
