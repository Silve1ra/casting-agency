import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment as env } from '../../../environments/environment';

interface Message {
  message: string;
}

@Component({
  selector: 'app-actors',
  templateUrl: './actors.component.html',
})
export class ActorsComponent implements OnInit {
  message: string = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  callSecureActors(): void {
    this.http.get(`${env.dev.apiUrl}/actors`).subscribe((result: Message) => {
      this.message = result.message;
    });
  }
}
