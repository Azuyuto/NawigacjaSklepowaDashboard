import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { ActionTypes } from 'src/app/helpers/action.types';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    action: number;
}
export const ROUTES: RouteInfo[] = [
    { path: 'list-shop', title: 'Lista sklepów',  icon:'ni-cart text-red', class: '', action: ActionTypes.ListShop },
    { path: 'dashboard', title: 'Pulpit',  icon: 'ni-tv-2 text-primary', class: '', action: ActionTypes.None },
    { path: 'icons', title: 'Icons',  icon:'ni-planet text-blue', class: '', action: ActionTypes.None },
    { path: 'maps', title: 'Maps',  icon:'ni-pin-3 text-orange', class: '', action: ActionTypes.None },
    { path: 'user-profile', title: 'User profile',  icon:'ni-single-02 text-yellow', class: '', action: ActionTypes.None },
    { path: 'tables', title: 'Tables',  icon:'ni-bullet-list-67 text-red', class: '', action: ActionTypes.None },
    { path: '', title: 'Wyloguj',  icon:'ni-user-run text-black', class: '', action: ActionTypes.Logout},
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
}
