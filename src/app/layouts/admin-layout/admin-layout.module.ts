import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateShopComponent } from 'src/app/pages/shop/create-shop/create-shop.component';
import { ViewShopComponent } from 'src/app/pages/shop/view-shop/view-shop.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { ListShopComponent } from 'src/app/pages/shop/list-shop/list-shop.component';
import { AddProductComponent } from 'src/app/pages/product/add-product/add-product.component';
import { ListProductsComponent } from 'src/app/pages/product/list-products/list-products.component';
import { AddEmployeeComponent } from 'src/app/pages/employee/add-employee/add-employee.component';
import { ListEmployeesComponent } from 'src/app/pages/employee/list-employees/list-employees.component';
// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    ComponentsModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TablesComponent,
    IconsComponent,
    MapsComponent,
    CreateShopComponent,
    ViewShopComponent,
    AddProductComponent,
    AddEmployeeComponent,
    ListShopComponent,
    ListProductsComponent,
    ListEmployeesComponent
  ]
})

export class AdminLayoutModule {}
