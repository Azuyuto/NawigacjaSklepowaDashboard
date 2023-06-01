import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { CreateShopComponent } from 'src/app/pages/shop/create-shop/create-shop.component';
import { ViewShopComponent } from 'src/app/pages/shop/view-shop/view-shop.component';
import { ListShopComponent } from 'src/app/pages/shop/list-shop/list-shop.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'create-shop',    component: CreateShopComponent },
    { path: 'view-shop/:id',      component: ViewShopComponent },
    { path: 'list-shop',      component: ListShopComponent },
];
