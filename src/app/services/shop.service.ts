import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';

const AUTH_API = 'https://localhost:7143/Shop/';
var httpOptions = {
  headers: new HttpHeaders({  'Content-Type': 'application/json', 
                              'Access-Control-Allow-Origin': '*', 
                              'Access-Control-Allow-Credentials': 'true', 
                              "X-Requested-With": "XMLHttpRequest" }),
  withCredentials: true,
};

@Injectable({
  providedIn: 'root'
})

export class ShopService {
  userId: any;
  constructor(private http: HttpClient, private storageService: StorageService) {
    httpOptions.headers = httpOptions.headers.set("Authorization", "Bearer " + storageService.getToken());
    this.userId = storageService.getUser().id;
  }

  createShop(name: any, address: any, postalCode: any, city: any, country: any, email: any, phone: any): Observable<any> {
    return this.http.post(
      AUTH_API + 'createShop',
      {
        "userId": this.userId,
        "name": name,
        "address": address,
        "postalCode": postalCode,
        "city": city,
        "country": country,
        "email": email,
        "phone": phone,
      },
      httpOptions
    );
  }
}
