import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { CreateShopComponent } from 'src/app/pages/shop/create-shop/create-shop.component';
import { ViewShopComponent } from 'src/app/pages/shop/view-shop/view-shop.component';
import { ListShopComponent } from 'src/app/pages/shop/list-shop/list-shop.component';
import { ShopAdminAuthGuard } from 'src/app/auth/shopAdmin.auth.guard';
import { AddProductComponent } from 'src/app/pages/product/add-product/add-product.component';
import { ListProductsComponent } from 'src/app/pages/product/list-products/list-products.component';
import { AddEmployeeComponent } from 'src/app/pages/employee/add-employee/add-employee.component';
import { ListEmployeesComponent } from 'src/app/pages/employee/list-employees/list-employees.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'create-shop',    component: CreateShopComponent, canActivate: [ShopAdminAuthGuard] },
    { path: 'add-product',      component: AddProductComponent },
    { path: 'list-products',      component: ListProductsComponent },
    { path: 'view-shop/:id',      component: ViewShopComponent },
    { path: 'list-shop',      component: ListShopComponent },
    { path: 'add-employee',      component: AddEmployeeComponent },
    { path: 'list-employees',      component: ListEmployeesComponent },
];
