import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { ShopService } from 'src/app/services/shop.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  form: any = {
    name: "",
    description: "",
    category: "",
    price: null,
    shelfId: null
  };

  shop: any;
  shelves: any;
  errorMessage = '';
  isFormFailed = false;
  isFormSuccess = false;

  constructor(private productService: ProductService, private router: Router, private storageService: StorageService, private shopService: ShopService) {
    this.form.email = storageService.getUser().email;
  }

  ngOnInit() {
    this.shopService.getUserShop().subscribe({
      next: data => {
        this.shop = data.shop;
        console.log(data);
        this.shopService.getShelves(this.shop.id).subscribe({
          next: data => {
            this.shelves = data.shelves;
            console.log(data);
          },
          error: err => {
            console.log(err);
          }
        });
      },
      error: err => {
        console.log(err);
      }
    });
  }

  onSubmit(): void {
    const { name, description, category, price, shelfId } = this.form;
    this.productService.addProduct(name, description, category, price, shelfId, this.shop.id).subscribe({
      next: data => {
        this.isFormFailed = false;
        this.isFormSuccess = true;
        setTimeout(() => {
          window.location.assign('/view-shop/0');
        }, 1500);
      },
      error: err => {
        console.log(err);
        this.errorMessage = err.error;
        this.isFormFailed = true;
      }
    });
  }
}
