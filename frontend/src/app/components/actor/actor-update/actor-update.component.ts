import { ActivatedRoute } from '@angular/router'
import { Router } from '@angular/router'
import { ActorService } from '../actor.service'
import { Actor } from '../actor.model'
import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-actor-update',
  templateUrl: './actor-update.component.html',
  styleUrls: ['./actor-update.component.css'],
})
export class ActorUpdateComponent implements OnInit {
  actor!: Actor

  constructor(
    private actorService: ActorService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.actorService.readById(Number(id)).subscribe((actor) => {
      this.actor = actor
    })
  }

  updateActor(): void {
    this.actorService.update(this.actor).subscribe(() => {
      this.actorService.showMessage('Actor updated with success!')
      this.router.navigate(['/actors'])
    })
  }

  cancel(): void {
    this.router.navigate(['/actors'])
  }
}
