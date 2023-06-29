import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { StorageService } from './storage.service';

const EMPLOYEE_API = 'https://localhost:7143/ShopAdmin/';

var httpOptions = {
  headers: new HttpHeaders({  'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:4200', 'Access-Control-Allow-Credentials': 'true', "X-Requested-With": "XMLHttpRequest" }),
  withCredentials: false,
};


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient, private storageService: StorageService) { 
    httpOptions.headers = httpOptions.headers.set("Authorization", "Bearer " + storageService.getToken());
  }

  addEmployee(firstName: string, lastName: string, shopId: number, email: string, password: string): Observable<any> {
    return this.http.post(
      EMPLOYEE_API + 'CreateEmployee',
      {
        "user":{
          "firstName": firstName,
          "lastName": lastName,
          "email":email,
          "password":password,
        },        
        "shopId":shopId
      },
      httpOptions
    );
  }

  getEmployeeList() : Observable<any>{
    const requestOptions = {
      headers: httpOptions.headers,
      withCredentials: true
    };
    return this.http.get(EMPLOYEE_API + "Employees", requestOptions);
  }
}
