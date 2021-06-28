import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActorService } from '../actor.service';

@Component({
  selector: 'app-actor-delete',
  templateUrl: './actor-delete.component.html',
  styleUrls: ['./actor-delete.component.css'],
})
export class ActorDeleteComponent implements OnInit {
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

  deleteActor(): void {
    this.actorService.delete(this.actor.id).subscribe(
      () => {
        this.router.navigate(['/actors']);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  cancel(): void {
    this.router.navigate(['/actors']);
  }
}
