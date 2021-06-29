import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActorService } from '../actor.service';

@Component({
  selector: 'app-actor-update',
  templateUrl: './actor-update.component.html',
  styleUrls: ['./actor-update.component.css'],
})
export class ActorUpdateComponent implements OnInit {
  actor = null;

  constructor(
    private actorService: ActorService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.findOne(this.route.snapshot.paramMap.get('id'));
  }

  findOne(id): void {
    this.actorService.findOne(id).subscribe(
      (actor) => {
        this.actor = actor.data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateActor(): void {
    const data = {
      name: this.actor.name,
      age: this.actor.age,
      gender: this.actor.gender,
    };

    this.actorService.update(this.actor.id, data).subscribe(
      () => {},
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
