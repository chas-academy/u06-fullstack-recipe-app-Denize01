import { Component } from '@angular/core';
import { LoginDetails } from '../../interfaces/login-details';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginDetails: LoginDetails;

  constructor(private auth: AuthService) {
    this.loginDetails = {
      email: 'den@den.den',
      password: 'denden',
    };
  }
  login() {
    this.auth.loginUser(this.loginDetails);
  }

  logout() {
    this.auth.logOut();
  }
}
