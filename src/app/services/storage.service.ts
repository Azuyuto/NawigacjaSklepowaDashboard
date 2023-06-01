import { Injectable } from '@angular/core';

const USER_KEY = 'auth-user';
const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {}

  clean(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: any)
  {
    token = token.replace(/^"|"$|"(?=\s)|"(?=\W)/g, '');
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }
  // client
  // employee
  // manager
  // shopadmin
  // appadmin
  public getToken(){
    const token = window.sessionStorage.getItem(TOKEN_KEY);
    return token;
  }

  public isClient(){
    const base64Url = this.getToken().split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const decodedToken = JSON.parse(window.atob(base64));
    return decodedToken && decodedToken["client"] !== undefined;
  }

  public isEmployee(){
    const base64Url = this.getToken().split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const decodedToken = JSON.parse(window.atob(base64));
    return decodedToken && decodedToken["employee"] !== undefined;
  }

  public isManager(){
    const base64Url = this.getToken().split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const decodedToken = JSON.parse(window.atob(base64));
    return decodedToken && decodedToken["manager"] !== undefined;
  }

  public isShopAdmin(){
    const base64Url = this.getToken().split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const decodedToken = JSON.parse(window.atob(base64));
    return decodedToken && decodedToken["shopAdmin"] !== undefined;
  }

  public isAppadmin(){
    const base64Url = this.getToken().split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const decodedToken = JSON.parse(window.atob(base64));
    return decodedToken && decodedToken["isAppadmin"] !== undefined;
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

  public isLoggedIn(): boolean {
    const token = window.sessionStorage.getItem(TOKEN_KEY);
    if (token) {
      return true;
    }

    return false;
  }
}