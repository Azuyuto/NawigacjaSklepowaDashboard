import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  form: any = {
    email: "",
    password: "",
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  
  constructor(private authService: AuthService, private storageService: StorageService) { }


  ngOnInit() {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
    }
  }
  ngOnDestroy() {
  }

  onSubmit(): void {
    const { email, password } = this.form;

    this.authService.login(email, password).subscribe({
      next: data => {
        this.storageService.saveUser(data.token, data.user);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.reloadPage();
      },
      error: err => {
        console.log(err);
        this.errorMessage = err.error;
        this.isLoginFailed = true;
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }

}
