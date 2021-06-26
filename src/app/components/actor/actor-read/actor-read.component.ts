import { ActorService } from '../actor.service'
import { Actor } from '../actor.model'
import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-actor-read',
  templateUrl: './actor-read.component.html',
  styleUrls: ['./actor-read.component.css'],
})
export class ActorReadComponent implements OnInit {
  actors!: Actor[]
  displayedColumns = ['id', 'name', 'age', 'gender', 'action']

  constructor(private actorService: ActorService) {}

  ngOnInit(): void {
    this.actorService.read().subscribe((actors) => {
      this.actors = actors
    })
  }
}
