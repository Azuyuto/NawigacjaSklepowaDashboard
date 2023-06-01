import { Component, OnInit } from '@angular/core';
import { ShopService } from 'src/app/services/shop.service';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-create-shop',
  templateUrl: './create-shop.component.html',
  styleUrls: ['./create-shop.component.scss']
})
export class CreateShopComponent implements OnInit {
  form: any = {
    name: "",
    address: "",
    postalCode: "",
    city: "Kraków",
    country: "Polska",
    email: "",
    phone: ""
  };
  errorMessage = '';
  isFormFailed = false;
  isFormSuccess = false;

  constructor(private shopService: ShopService, private router: Router, private storageService: StorageService) {
    this.form.email = storageService.getUser().email;
  }

  ngOnInit() {
  }

  onSubmit(): void {
    const { name, address, postalCode, city, country, email, phone } = this.form;
    this.shopService.createShop(name, address, postalCode, city, country, email, phone).subscribe({
      next: data => {
        this.storageService.saveToken(data.token);
        this.isFormFailed = false;
        this.isFormSuccess = true;
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 2000);
      },
      error: err => {
        console.log(err);
        this.errorMessage = err.error;
        this.isFormFailed = true;
      }
    });
  }

}
