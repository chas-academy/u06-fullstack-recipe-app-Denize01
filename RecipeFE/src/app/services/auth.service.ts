import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginDetails } from '../interfaces/login-details';
import {
  BehaviorSubject,
  EMPTY,
  Observable,
  catchError,
  throwError,
  map,
  tap,
} from 'rxjs';
import { User } from '../interfaces/user';
import { LoggedInUser } from '../interfaces/logged-in-user';
import { RegisteredUser } from '../interfaces/registered-user';
import { Registerdetails } from '../interfaces/registerdetails';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // private registered = new BehaviorSubject<RegisteredUser>({
  //   user: undefined,
  //   registeredState: false,
  // });
  // registered$ = this.registered.asObservable();

  private loggedIn = new BehaviorSubject<LoggedInUser>({
    user: undefined,
    loginState: false,
  });
  loggedIn$ = this.loggedIn.asObservable();

  private configUrl =
    'https://u06-fullstack-recipe-app-denize01.onrender.com/api/';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  private updateLoginState(loginState: LoggedInUser) {
    this.loggedIn.next(loginState);
  }
  getLoginStatus() {
    return this.loggedIn.value.loginState;
  }

  loginUser(loginDetails: LoginDetails): Observable<any> {
    return this.http
      .post<any>(this.configUrl + 'login', loginDetails, this.httpOptions)
      .pipe(
        catchError(this.handleError),
        tap((result) => {
          console.log(result);
          this.updateLoginState({
            user: result.user,
            loginState: true,
          });
          this.httpOptions.headers = this.httpOptions.headers.set(
            'Authorization',
            'Bearer ' + result.token
          );
        })
      );
  }

  logOut() {
    this.http
      .post<any>(this.configUrl + 'logout', {}, this.httpOptions)
      .pipe(catchError(this.handleError))
      .subscribe((result) => {
        console.log(result);
        this.updateLoginState({
          user: result.user,
          loginState: false,
        });
        this.httpOptions.headers = this.httpOptions.headers.set(
          'Authorization',
          'Bearer '
        );
      });
  }

  getCurrentUser(): Observable<User> {
    if (!this.loggedIn.value.user) {
      return EMPTY;
    }

    return this.http
      .get<User[]>(
        this.configUrl + 'getuser/' + this.loggedIn.value.user?.id,
        this.httpOptions
      )
      .pipe(
        map((users) => users[0]),
        catchError(this.handleError)
      );
  }

  register(data: any) {
    return this.http.post(
      'https://u06-fullstack-recipe-app-denize01.onrender.com/api/register',
      data
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 404) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
