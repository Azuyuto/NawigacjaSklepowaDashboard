import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'https://localhost:7143/Auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': 'true', "X-Requested-With": "XMLHttpRequest" }),
  withCredentials: false
};

const httpOptionsLogin = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': 'true', "X-Requested-With": "XMLHttpRequest" }),
  withCredentials: true
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
        "email": "c@cos.pl",
        "password": "Test1234",
      },
      httpOptionsLogin
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
        "email":"a@costam.pl",
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