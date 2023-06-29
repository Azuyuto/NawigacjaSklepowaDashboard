import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product-service.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {
  public productList: any[];
  isClient: any;

  constructor( private route: ActivatedRoute, private productService: ProductService) {
    this.isClient = productService.isClient;
  }

  ngOnInit(): void {
    this.productService.getProductList().subscribe({
      next: data => {
        this.productList = data.products;
      },
      error: err => {
        console.log(err);
      }
    });
  }

}
