import { Component } from '@angular/core';
import { Registerdetails } from '../../interfaces/registerdetails';
import { AuthService } from '../../services/auth.service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerDetails = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    password_confirmation: new FormControl(''),
  });

  constructor(private auth: AuthService, private router: Router) {}

  public error: any = [];

  registerUser() {
    return this.auth.register(this.registerDetails.value).subscribe(
      (data) => {
        this.router.navigate(['']);
      },
      (error) => {
        this.handleError(error);
      }
    );
  }
  handleError(error: any) {
    this.error = error?.error?.errors || {};
  }
}
