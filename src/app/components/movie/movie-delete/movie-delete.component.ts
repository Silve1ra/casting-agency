import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-delete',
  templateUrl: './movie-delete.component.html',
  styleUrls: ['./movie-delete.component.css'],
})
export class MovieDeleteComponent implements OnInit {
  movie = null;

  constructor(
    public movieService: MovieService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.findOne(this.route.snapshot.paramMap.get('id'));
  }

  findOne(id): void {
    this.movieService.findOne(id).subscribe(
      (movie) => {
        this.movie = movie.data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteMovie(): void {
    this.movieService.delete(this.movie.id).subscribe(
      () => {
        this.router.navigate(['/movies']);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  cancel(): void {
    this.router.navigate(['/movies']);
  }
}
