import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable, importProvidersFrom } from '@angular/core';
import { LoginDetails } from '../interfaces/login-details';
import { Observable, catchError, throwError } from 'rxjs';
import { User } from '../interfaces/user';

interface ResultData {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private configUrl = 'http://127.0.0.1:8000/api';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  loginUser(loginDetails: LoginDetails) {
    this.http
      .post<ResultData>(
        this.configUrl + 'login',
        loginDetails,
        this.httpOptions
      )
      .pipe(catchError(this.handleError))
      .subscribe((result) => {
        this.httpOptions.headers = this.httpOptions.headers.set(
          'Authorization',
          'Beare ' + result.token
        );
      });
  }

  getUser2(): Observable<User[]> {
    return this.http.get<User[]>(
      this.configUrl + 'getUser/2',
      this.httpOptions
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 404) {
      console.error('An error has occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    return throwError(
      () => new Error('Something bad happened: please try again later.')
    );
  }
}
