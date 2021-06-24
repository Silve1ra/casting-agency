import { ActivatedRoute } from '@angular/router'
import { Router } from '@angular/router'
import { Component, OnInit } from '@angular/core'
import { MovieService } from '../movie.service'
import { Movie } from '../movie.model'

@Component({
  selector: 'app-movie-update',
  templateUrl: './movie-update.component.html',
  styleUrls: ['./movie-update.component.css'],
})
export class MovieUpdateComponent implements OnInit {
  movie!: Movie

  constructor(
    private movieService: MovieService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.movieService.readById(Number(id)).subscribe((movie) => {
      this.movie = movie
    })
  }

  updateMovie(): void {
    this.movieService.update(this.movie).subscribe(() => {
      this.movieService.showMessage('Movie updated with success!')
      this.router.navigate(['/movies'])
    })
  }

  cancel(): void {
    this.router.navigate(['/movies'])
  }
}
