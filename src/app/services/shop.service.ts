import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';
import { Shop, Shops } from '../models/shop.class';

const SHOP_API = 'https://localhost:7143/Shop/';
const SHELF_API = 'https://localhost:7143/Shelf/manageLayout'
var httpOptions = {
  headers: new HttpHeaders({  'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': 'true', "X-Requested-With": "XMLHttpRequest" }),
  withCredentials: true,
};

@Injectable({
  providedIn: 'root'
})

export class ShopService {
  userId: any;
  isClient: any;
  shopId: any;

  constructor(private http: HttpClient, private storageService: StorageService) {
    httpOptions.headers = httpOptions.headers.set("Authorization", "Bearer " + storageService.getToken());
    this.userId = storageService.getUser().id;
    this.isClient = storageService.isClient();
  }

  createShop(name: any, address: any, postalCode: any, city: any, country: any, email: any, phone: any): Observable<any> {
    return this.http.post(
      SHOP_API + 'createShop',
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

  getShopList(): Observable<any> {
    const requestOptions = {
      headers: httpOptions.headers,
      withCredentials: true
    };
    return this.http.get(SHOP_API, requestOptions);
  }

  getShop(shopId: any): Observable<any> {
    const requestOptions = {
      headers: httpOptions.headers,
      withCredentials: true
    };
    return this.http.get(SHOP_API + shopId, requestOptions);
  }

  getUserShop(): Observable<any> {
    const requestOptions = {
      params: {
        "userId": this.userId
      },
      headers: httpOptions.headers,
      withCredentials: true
    };
    return this.http.get(SHOP_API + 'getByUserId', requestOptions);
  }

  createShelves(shelves: any): Observable<any>{
    const requestOptions = {
      params: {
        "userId": this.userId
      },
      headers: httpOptions.headers,
      withCredentials: true
    };

    this.http.get(SHOP_API + 'getByUserId', requestOptions).subscribe({
      next: (data: Shops) => {
        this.shopId = data.shop.id;
      }});
    
    return this.http.post(
      SHELF_API,
      {
        "shopId": this.shopId,
        "shelves": shelves
      },
      httpOptions
    );
  }
}
