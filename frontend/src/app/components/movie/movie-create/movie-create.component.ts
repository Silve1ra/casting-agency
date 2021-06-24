import { Router } from '@angular/router'
import { Component, OnInit } from '@angular/core'
import { Movie } from '../movie.model'
import { MovieService } from '../movie.service'

@Component({
  selector: 'app-movie-create',
  templateUrl: './movie-create.component.html',
  styleUrls: ['./movie-create.component.css'],
})
export class MovieCreateComponent implements OnInit {
  movie: Movie = {
    title: '',
    release_date: new Date(),
  }
  constructor(private userService: MovieService, private router: Router) {}

  ngOnInit(): void {}

  createMovie(): void {
    this.userService.create(this.movie).subscribe(() => {
      this.userService.showMessage('Movie created with success!')
      this.router.navigate(['/movies'])
    })
  }

  cancel(): void {
    this.router.navigate(['/movies'])
  }
}
