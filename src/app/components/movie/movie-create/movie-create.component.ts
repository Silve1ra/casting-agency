import { MovieService } from './../movie.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-create',
  templateUrl: './movie-create.component.html',
  styleUrls: ['./movie-create.component.css'],
})
export class MovieCreateComponent implements OnInit {
  movie = {
    title: '',
    release_date: '',
  };
  submitted = false;

  constructor(public movieService: MovieService, private router: Router) {}

  ngOnInit(): void {}

  createMovie(): void {
    this.movieService.create(this.movie).subscribe(
      (response) => {
        console.log(response);
        this.submitted = true;
      },
      (error) => {
        console.log(error);
      }
    );

    this.router.navigate(['/movies']);
  }

  cancel(): void {
    this.router.navigate(['/movies']);
  }
}
