import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ActorService } from '../actor.service';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-actor-read',
  templateUrl: './actor-read.component.html',
  styleUrls: ['./actor-read.component.css'],
})
export class ActorReadComponent implements OnInit {
  actors: any;

  constructor(
    private router: Router,
    public auth: AuthService,
    private actorService: ActorService
  ) {}

  ngOnInit(): void {
    this.readActors();
  }

  readActors(): void {
    this.actorService.findAll().subscribe(
      (actors) => {
        this.actors = actors.data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  navigateToProductCreate(): void {
    this.router.navigate(['/actors/create']);
  }
}
