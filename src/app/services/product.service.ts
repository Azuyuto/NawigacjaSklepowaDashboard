import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';

const AUTH_API = 'https://localhost:7143/Product/';
const GETPRODUCTS_API = 'getByUserId/'
var httpOptions = {
  headers: new HttpHeaders({  'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': 'true', "X-Requested-With": "XMLHttpRequest" }),
  withCredentials: true,
};

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  userId: any;
  userEmail: any;
  isClient: any;

  constructor(private http: HttpClient, private storageService: StorageService) {
    httpOptions.headers = httpOptions.headers.set("Authorization", "Bearer " + storageService.getToken());
    this.userId = storageService.getUser().id;
    this.isClient = storageService.isClient();
  }

  addProduct(name: any, description: any, category: any, price: any, shelfId: any, shopId: any): Observable<any> {
    return this.http.post(
      AUTH_API + 'createProduct',
      {
        "name": name,
        "description": description,
        "category": category,
        "price": price,
        "shelfId": shelfId,
        "shopId": shopId
      },
      httpOptions
    );
  }

  getProductList(): Observable<any> {
    const requestOptions = {
      params: {
        "userId": this.userId
      },
      headers: httpOptions.headers,
      withCredentials: true
    };
    return this.http.get(AUTH_API + GETPRODUCTS_API, requestOptions);
  }

  getProductsByShopId(shopId: any): Observable<any> {
    const requestOptions = {
      params: {
        "shopId": shopId
      },
      headers: httpOptions.headers,
      withCredentials: true
    };
    return this.http.get(AUTH_API + "getByShopId", requestOptions);
  }
}
