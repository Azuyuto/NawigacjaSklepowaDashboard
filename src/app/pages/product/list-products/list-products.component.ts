import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {

  constructor( private router: Router) { }

  ngOnInit(): void {
  }

}
