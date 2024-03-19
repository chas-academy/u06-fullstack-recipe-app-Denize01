import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { LoginDetails } from './interfaces/login-details';
import { User } from './interfaces/user';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'RecipeFE';

  loginDetails: LoginDetails;

  user: User;

  constructor(private auth: AuthService) {
    this.loginDetails = {
      email: 'den@den.den',
      password: 'denden',
    };

    this.user = {
      id: -1,
      name: 'Diddi',
      email: 'diddi@diddi.diddi',
    };

    auth.loginUser(this.loginDetails);
  }

  getUser() {
    this.auth.getUser2().subscribe((res) => {
      console.log(res[0]);
      this.user = res[0];
    });
  }
}
