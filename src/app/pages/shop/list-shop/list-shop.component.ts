import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-list-shop',
  templateUrl: './list-shop.component.html',
  styleUrls: ['./list-shop.component.scss']
})
export class ListShopComponent implements OnInit {
  public shopList: any[];
  constructor(private route: ActivatedRoute, private shopService: ShopService) {
  }

  ngOnInit(): void {
    this.shopService.getShopList().subscribe({
      next: data => {
        this.shopList = data.shops;
        console.log(this.shopList);
      },
      error: err => {
        console.log(err);
      }
    });
  }

}
