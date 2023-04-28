import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:5209/Auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': 'true', "X-Requested-With": "XMLHttpRequest" }),
  withCredentials: false
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'login',
      {
        username,
        password,
      },
      httpOptions
    );
  }

  register(firstName: string, lastName: string, email: string, password: string, confirmPassword: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'register',
      {
        // "firstName": firstName,
        // "lastName": lastName,
        // "email":email,
        // "password":password,
        // "confirmPassword":confirmPassword

        "firstName": firstName,
        "lastName": "dab",
        "email":"a@cos.pl",
        "password":"Test1234",
        "confirmPassword":"Test1234"
      },
      httpOptions
    );
  }

  logout(): void {
    //return this.http.post(AUTH_API + 'signout', { }, httpOptions);
  }
}