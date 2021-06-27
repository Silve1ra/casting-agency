import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActorService } from '../actor.service';

@Component({
  selector: 'app-actor-delete',
  templateUrl: './actor-delete.component.html',
  styleUrls: ['./actor-delete.component.css'],
})
export class ActorDeleteComponent implements OnInit {
  id!: number;

  constructor(
    private actorService: ActorService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
  }

  async deleteActor(): Promise<any> {
    this.actorService.delete(this.id);
    this.router.navigate(['/actors']);
  }

  cancel(): void {
    this.router.navigate(['/actors']);
  }
}
