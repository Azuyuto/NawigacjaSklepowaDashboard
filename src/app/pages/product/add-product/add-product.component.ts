import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product-service.service';
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
    floor: null,
    shelves: "",
    shopId: null
  };

  errorMessage = '';
  isFormFailed = false;
  isFormSuccess = false;

  constructor(private productService: ProductService, private router: Router, private storageService: StorageService) {
    this.form.email = storageService.getUser().email;
  }

  ngOnInit() {
  }

  onSubmit(): void {
    const { name, description, category, price, floor, shelves, shopId } = this.form;
    this.productService.addProduct(name, description, category, price, floor, shelves, shopId).subscribe({
      next: data => {
        this.isFormFailed = false;
        this.isFormSuccess = true;
        setTimeout(() => {
          window.location.assign('/list-products');
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
