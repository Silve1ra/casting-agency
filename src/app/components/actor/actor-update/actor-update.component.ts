import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActorService } from '../actor.service';

@Component({
  selector: 'app-actor-update',
  templateUrl: './actor-update.component.html',
  styleUrls: ['./actor-update.component.css'],
})
export class ActorUpdateComponent implements OnInit {
  actor: any;
  id!: number;

  constructor(
    private actorService: ActorService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.actorService.findOne(Number(this.id)).subscribe((actor) => {
      this.actor = actor.data;
    });
  }

  updateActor(): void {
    this.actorService.update(this.id, this.actor).subscribe(() => {
      this.router.navigate(['/actors']);
    });
  }

  cancel(): void {
    this.router.navigate(['/actors']);
  }
}
