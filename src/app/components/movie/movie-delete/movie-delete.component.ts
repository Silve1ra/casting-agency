import { ActivatedRoute } from '@angular/router'
import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { MovieService } from '../movie.service'
import { Movie } from '../movie.model'

@Component({
  selector: 'app-movie-delete',
  templateUrl: './movie-delete.component.html',
  styleUrls: ['./movie-delete.component.css'],
})
export class MovieDeleteComponent implements OnInit {
  movie!: Movie

  constructor(
    private movieService: MovieService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.movieService.readById(Number(id)).subscribe((user) => {
      this.movie = user
    })
  }

  deleteMovie(): void {
    this.movieService.delete(this.movie.id).subscribe(() => {
      this.movieService.showMessage('Movie deleted with success!')
      this.router.navigate(['/movies'])
    })
  }

  cancel(): void {
    this.router.navigate(['/movies'])
  }
}
