import { Component } from '@angular/core';
import { UsersAuthFireService } from './services/users-auth-fire.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private firebaseauthService: UsersAuthFireService) {}
}
