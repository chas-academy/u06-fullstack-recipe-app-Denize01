import { Component } from '@angular/core';
import { LoginDetails } from '../../interfaces/login-details';
import { AuthService } from '../../services/auth.service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginDetails: LoginDetails;

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private router: Router, private auth: AuthService) {
    this.loginForm.setValue({
      email: this.loginForm.get('email')!.value,
      password: this.loginForm.get('password')!.value,
    });

    this.loginDetails = this.loginForm.value as LoginDetails;
  }

  ngOnInit(): void {}

  public error: any = [];

  submitLogin() {
    if (this.loginForm.valid) {
      const formValue = this.loginForm.value;
      const loginDetails: LoginDetails = {
        email: formValue.email || '',
        password: formValue.password || '',
      };
      this.auth.loginUser(loginDetails).subscribe({
        next: (success) => {
          if (success) {
            this.router.navigate(['/profile']);
          } else {
            this.error = 'Unable to login. Please try again later.';
          }
        },
        error: (error) => {
          this.error = 'Unable to login. Please try again later.';
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  login() {
    this.auth.loginUser(this.loginDetails);
  }
  handleError(error: any) {
    this.error = error?.error?.errors || {};
  }
}
