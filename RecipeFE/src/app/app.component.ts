import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { LoginDetails } from './interfaces/login-details';
import { User } from './interfaces/user';
import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { LoggedInUser } from './interfaces/logged-in-user';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    RouterLink,
    RouterLinkActive,
    AsyncPipe,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'RecipeFE';

  user?: User;

  loginDetails: LoginDetails;

  loggedIn$: Observable<LoggedInUser>;

  constructor(private auth: AuthService) {
    this.loginDetails = {
      email: 'den@den.den',
      password: 'denden',
    };

    this.loggedIn$ = this.auth.loggedIn$;
  }
}
