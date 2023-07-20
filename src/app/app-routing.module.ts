import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { LoginComponent } from './shared/login/login.component';
import { CustomerLayoutComponent } from './components/layout/customer-layout/customer-layout.component';

const routes: Routes = [
  {path: '', redirectTo: 'login',pathMatch: 'full'}, 
  {path:'',component:LoginComponent},
  {
    path: 'customer',
    component: CustomerLayoutComponent,
    canActivate:[AuthGuard],
    children: [
        {
      path: '',loadChildren: () => import('./components/layout/customer-layout.module').then(x => x.CustomerLayoutModule)
  }]},
 
  {path: '**',redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
