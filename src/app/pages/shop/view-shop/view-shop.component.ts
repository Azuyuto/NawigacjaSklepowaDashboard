import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShopService } from 'src/app/services/shop.service';

@Component({
  selector: 'app-view-shop',
  templateUrl: './view-shop.component.html',
  styleUrls: ['./view-shop.component.scss']
})
export class ViewShopComponent implements OnInit {
  id: any;
  shop: any;

  constructor(private route: ActivatedRoute, private shopService: ShopService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    if(this.id == 0)
    {
      this.shopService.getUserShop().subscribe({
        next: data => {
          this.shop = data.shop;
          console.log(data);
        },
        error: err => {
          console.log(err);
        }
      });
    }
    else
    {
      this.shopService.getShop(this.id).subscribe({
        next: data => {
          this.shop = data.shop;
          console.log(data);
        },
        error: err => {
          console.log(err);
        }
      });
    }
  }
}
