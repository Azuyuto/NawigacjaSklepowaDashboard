import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: any = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSubmit(): void {
    const { firstName, lastName, email, password, confirmPassword } = this.form;

    // alert(lastName);
    this.authService.register(firstName, lastName, email, password, confirmPassword).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }
}
