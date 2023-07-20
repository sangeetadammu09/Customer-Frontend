import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './shared/login/login.component';
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CustomerLayoutModule } from './components/layout/customer-layout.module';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,HttpClientModule,BrowserAnimationsModule,
    AppRoutingModule, FormsModule, ReactiveFormsModule,CustomerLayoutModule,
    ToastrModule.forRoot({
      closeButton: true,
      timeOut: 3000,// 3 seconds
      progressBar: true,
      positionClass: "toast-top-center",
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
