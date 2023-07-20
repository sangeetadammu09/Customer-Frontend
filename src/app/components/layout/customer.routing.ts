import { Routes } from '@angular/router';
import { CustomerDetailsComponent } from 'src/app/components/customer-details/customer-details.component';
import { CustomerListComponent } from 'src/app/components/customer-list/customer-list.component';
import { AuthGuard } from 'src/app/guard/auth.guard';

export const CustomerLayoutRoutes: Routes = [
    
   {path: 'customer-list', component: CustomerListComponent, canActivate:[AuthGuard]},
   {path: 'customer-details', component: CustomerDetailsComponent,canActivate:[AuthGuard]}
];
