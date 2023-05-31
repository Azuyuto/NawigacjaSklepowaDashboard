import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionTypes } from 'src/app/helpers/action.types';
import { AuthService } from 'src/app/services/auth.service';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    action: number;
}
export const ROUTES: RouteInfo[] = [
    { path: 'dashboard', title: 'Pulpit',  icon: 'ni-tv-2 text-primary', class: '', action: ActionTypes.None },
    { path: 'icons', title: 'Icons',  icon:'ni-planet text-blue', class: '', action: ActionTypes.None },
    { path: 'maps', title: 'Maps',  icon:'ni-pin-3 text-orange', class: '', action: ActionTypes.None },
    { path: 'user-profile', title: 'User profile',  icon:'ni-single-02 text-yellow', class: '', action: ActionTypes.None },
    { path: 'tables', title: 'Tables',  icon:'ni-bullet-list-67 text-red', class: '', action: ActionTypes.None },
    { path: '/main', title: 'Wyloguj',  icon:'ni-user-run text-black', class: '', action: ActionTypes.Logout},
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }

  DetectAction(actionCode: number){
    switch(actionCode){
      case ActionTypes.Logout: this.Logout();
    }
  }

  Logout(){
    this.authService.logout();
  }
}
