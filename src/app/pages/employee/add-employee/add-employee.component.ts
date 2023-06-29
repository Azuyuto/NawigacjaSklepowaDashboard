import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {
  form: any = {
    firstName: "",
    lastName: "",
    email: "",
    shopId: "",
    password: "",
    confirmPassword: "",
  };

  isFormFailed = false;
  isFormSuccess = false;
  errorMessage = '';
  
  constructor(private employeeService: EmployeeService) {
   }

  ngOnInit() {
  }

  onSubmit(): void {
    const { firstName, lastName, email, password, shopId} = this.form;
    this.employeeService.addEmployee(firstName, lastName, shopId, email, password).subscribe({
      next: data => {
        console.log(data);
        this.isFormSuccess = true;
        this.isFormFailed = false;
        setTimeout(() => {
          window.location.assign('/list-employees');
        }, 1500);
      },
      error: err => {
        this.errorMessage = err.error;
        this.isFormFailed = true;
      }
    });
  }
}
