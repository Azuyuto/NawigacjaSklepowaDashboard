import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-shop',
  templateUrl: './create-shop.component.html',
  styleUrls: ['./create-shop.component.scss']
})
export class CreateShopComponent implements OnInit {

  form: any = {
    name: "",
  };

  constructor() { }

  ngOnInit() {
  }

  onSubmit(): void {
    const { name } = this.form;

    // this.authService.login(email, password).subscribe({
    //   next: data => {
    //     this.storageService.saveUser(data.token, data.user);
    //     this.isLoginFailed = false;
    //     this.isLoggedIn = true;
    //     this.reloadPage();
    //   },
    //   error: err => {
    //     console.log(err);
    //     this.errorMessage = err.error;
    //     this.isLoginFailed = true;
    //   }
    // });
  }

}
