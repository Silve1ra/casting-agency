import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-update',
  templateUrl: './movie-update.component.html',
  styleUrls: ['./movie-update.component.css'],
})
export class MovieUpdateComponent implements OnInit {
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

  updateMovie(): void {
    const data = {
      title: this.movie.title,
      release_date: this.movie.release_date,
    };

    this.movieService.update(this.movie.id, data).subscribe(
      () => {},
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
