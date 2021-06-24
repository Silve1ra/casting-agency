import { ActorService } from '../actor.service'
import { Router } from '@angular/router'
import { Component, OnInit } from '@angular/core'
import { Actor } from '../actor.model'

@Component({
  selector: 'app-actor-create',
  templateUrl: './actor-create.component.html',
  styleUrls: ['./actor-create.component.css'],
})
export class ActorCreateComponent implements OnInit {
  actor: Actor = {
    name: '',
    gender: null,
  }

  constructor(private actorService: ActorService, private router: Router) {}

  ngOnInit(): void {}

  createActor(): void {
    this.actorService.create(this.actor).subscribe(() => {
      this.actorService.showMessage('Actor created with success!')
      this.router.navigate(['/actors'])
    })
  }

  cancel(): void {
    this.router.navigate(['/actors'])
  }
}
