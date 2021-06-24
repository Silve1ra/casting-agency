import { Actor } from '../actor.model'
import { ActivatedRoute } from '@angular/router'
import { Router } from '@angular/router'
import { ActorService } from '../actor.service'
import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-actor-delete',
  templateUrl: './actor-delete.component.html',
  styleUrls: ['./actor-delete.component.css'],
})
export class ActorDeleteComponent implements OnInit {
  actor!: Actor

  constructor(
    private actorService: ActorService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.actorService.readById(Number(id)).subscribe((product) => {
      this.actor = product
    })
  }

  deleteActor(): void {
    this.actorService.delete(this.actor.id).subscribe(() => {
      this.actorService.showMessage('Actor deleted with success!')
      this.router.navigate(['/actors'])
    })
  }

  cancel(): void {
    this.router.navigate(['/actors'])
  }
}
