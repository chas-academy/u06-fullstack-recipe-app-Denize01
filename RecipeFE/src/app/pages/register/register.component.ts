import { Component } from '@angular/core';
import { Registerdetails } from '../../interfaces/registerdetails';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerdetails: Registerdetails;

  constructor(private auth: AuthService) {
    this.registerdetails = {
      name: 'denny',
      email: 'denny@den.den',
      password: 'dennydenny',
      password_confirmation: 'dennydenny',
    };
  }
  registerUser() {
    this.auth.registerNewUser(this.registerdetails);
  }
}
