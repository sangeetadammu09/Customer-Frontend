import { NgModule } from '@angular/core';

export const APP_DI_CONFIG: any = {
  // For api calls
   parentDomain: 'http://localhost:8080/api',
   endPoints: {
    Customer:{
      InsertCustomer : "/insertCustomer",
      VerifyCustomer : "/verifyCustomer",
      SelectCustomers : "/selectCustomers",
      GetCustomerByName : "/getCustomerByName",
      ForgotPassword : "/forgotPassword",
      Customer : "/",
      Login : "/login",
      
    },
  }
  
};

@NgModule({
})
export class AppConfigModules {}