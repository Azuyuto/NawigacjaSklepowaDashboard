import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { ActionTypes } from 'src/app/models/action.types';
import { StorageService } from 'src/app/services/storage.service';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    action: number;
}
export const ROUTES: RouteInfo[] = [
    { path: 'list-shop', title: 'Lista sklepów',  icon:'ni-bullet-list-67 text-blue', class: '', action: ActionTypes.ListShop },
    { path: 'create-shop', title: 'Stwórz sklep!',  icon:'ni-ruler-pencil text-blue', class: '', action: ActionTypes.None },
    { path: 'view-shop/0', title: 'Zobacz sklep',  icon:'ni-shop text-blue', class: '', action: ActionTypes.None },
    { path: 'add-product', title: 'Dodaj produkt',  icon:'ni-fat-add text-blue', class: '', action: ActionTypes.None },
    { path: 'list-products', title: 'Zobacz produkty',  icon:'ni-books text-blue', class: '', action: ActionTypes.None },
    { path: 'add-employee', title: 'Dodaj pracownika',  icon:'ni-fat-add text-blue', class: '', action: ActionTypes.None },
    { path: 'list-employees', title: 'Zobacz pracowników',  icon:'ni-single-02 text-blue', class: '', action: ActionTypes.None },
    { path: 'dashboard', title: 'Pulpit',  icon: 'ni-tv-2 text-blue', class: '', action: ActionTypes.None },
    { path: 'icons', title: 'Icons',  icon:'ni-planet text-blue', class: '', action: ActionTypes.None },
    { path: 'maps', title: 'Maps',  icon:'ni-pin-3 text-blue', class: '', action: ActionTypes.None },
    { path: 'user-profile', title: 'User profile',  icon:'ni-single-02 text-blue', class: '', action: ActionTypes.None },
    { path: 'tables', title: 'Tables',  icon:'ni-bullet-list-67 text-blue', class: '', action: ActionTypes.None },
    { path: '', title: 'Wyloguj',  icon:'ni-button-power text-blue', class: '', action: ActionTypes.Logout},
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;
  isClient: any;

  constructor(private router: Router, private appComponent: AppComponent, private storageService: StorageService) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
   this.isClient = this.storageService.isClient();
  }

  DetectAction(actionCode: number){
    switch(actionCode){
      case ActionTypes.Logout: this.Logout();
    }
  }

  Logout(){
    this.appComponent.logout();
  }

  ShouldShowItem(item: any){
    if (item.path === ROUTES[1].path){
      return this.isClient;
    }
    if (item.path === ROUTES[2].path){
      return !this.isClient;
    }

    return true;
  }
}
