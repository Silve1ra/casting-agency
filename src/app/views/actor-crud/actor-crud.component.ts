import { HeaderService } from '../../components/template/header/header.service'
import { Router } from '@angular/router'
import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-actor-crud',
  templateUrl: './actor-crud.component.html',
  styleUrls: ['./actor-crud.component.css'],
})
export class ActorCrudComponent implements OnInit {
  constructor(private router: Router, private headerService: HeaderService) {
    headerService.headerData = {
      title: 'Store Actor',
      icon: 'storefront',
      routeUrl: '/actors',
    }
  }

  ngOnInit(): void {}

  navigateToProductCreate(): void {
    this.router.navigate(['/actors/create'])
  }
}
