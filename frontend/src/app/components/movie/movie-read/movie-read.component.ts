import { Component, OnInit } from '@angular/core'
import { MovieService } from '../movie.service'
import { Movie } from '../movie.model'

@Component({
  selector: 'app-movie-read',
  templateUrl: './movie-read.component.html',
  styleUrls: ['./movie-read.component.css'],
})
export class MovieReadComponent implements OnInit {
  movies!: Movie[]
  displayedColumns = ['id', 'title', 'release_date', 'action']

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.read().subscribe((movies) => {
      this.movies = movies
    })
  }
}
