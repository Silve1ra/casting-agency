import { Component, Inject, OnInit } from '@angular/core'

import { AuthService } from '@auth0/auth0-angular'
import { DOCUMENT } from '@angular/common'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    public auth: AuthService,
    @Inject(DOCUMENT) private doc: Document
  ) {}

  ngOnInit(): void {}

  loginWithRedirect(): void {
    this.auth.loginWithRedirect()
  }

  logout(): void {
    this.auth.logout({ returnTo: this.doc.location.origin })
  }
}
