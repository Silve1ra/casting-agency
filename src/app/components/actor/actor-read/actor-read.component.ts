import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ActorService } from '../actor.service';

@Component({
  selector: 'app-actor-read',
  templateUrl: './actor-read.component.html',
  styleUrls: ['./actor-read.component.css'],
})
export class ActorReadComponent implements OnInit {
  actors: any;
  constructor(private router: Router, private actorService: ActorService) {}

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
}
