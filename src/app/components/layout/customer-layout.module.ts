import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CustomerLayoutRoutes } from './customer.routing';
import { CustomerListComponent } from 'src/app/components/customer-list/customer-list.component';
import { CustomerDetailsComponent } from '../customer-details/customer-details.component';
import { CustomerLayoutComponent } from './customer-layout/customer-layout.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(CustomerLayoutRoutes),
    FormsModule,ReactiveFormsModule,NgxPaginationModule
  ],
  declarations: [
    CustomerLayoutComponent,NavbarComponent,
    CustomerListComponent,CustomerDetailsComponent
  ]
})

export class CustomerLayoutModule {}
