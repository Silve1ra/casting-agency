import { Router } from '@angular/router'
import { Component, OnInit } from '@angular/core'
import { HeaderService } from 'src/app/components/template/header/header.service'

@Component({
  selector: 'app-user-crud',
  templateUrl: './movie-crud.component.html',
  styleUrls: ['./movie-crud.component.css'],
})
export class MovieCrudComponent implements OnInit {
  constructor(private router: Router, private headerService: HeaderService) {
    headerService.headerData = {
      title: 'Store Movie',
      icon: 'storefront',
      routeUrl: '/movies',
    }
  }

  ngOnInit(): void {}

  navigateToUserCreate(): void {
    this.router.navigate(['/movies/create'])
  }
}
