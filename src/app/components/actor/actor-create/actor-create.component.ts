import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActorService } from '../actor.service';

@Component({
  selector: 'app-actor-create',
  templateUrl: './actor-create.component.html',
  styleUrls: ['./actor-create.component.css'],
})
export class ActorCreateComponent implements OnInit {
  actor = {
    name: '',
    age: '',
    gender: '',
  };
  submitted = false;

  constructor(private actorService: ActorService, private router: Router) {}

  ngOnInit(): void {}

  createActor(): void {
    this.actorService.create(this.actor).subscribe(
      (response) => {
        console.log(response);
        this.submitted = true;
      },
      (error) => {
        console.log(error);
      }
    );

    this.router.navigate(['/actors']);
  }

  cancel(): void {
    this.router.navigate(['/actors']);
  }
}
