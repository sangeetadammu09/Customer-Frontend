import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { APP_DI_CONFIG } from 'src/app/app.config';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private customer = new BehaviorSubject(null);
  selectedCustomer = this.customer.asObservable();

  sendCustomer(data: any) {
    this.customer.next(data);
  }

  private removeCustomer = new BehaviorSubject(null);
  deletedCustomer = this.removeCustomer.asObservable();

  sendDeletedCustomerInfo(data: any) {
    this.removeCustomer.next(data);
  }


  constructor(private http: HttpClient){ }

  getAllCustomers(){
   return this.http.get<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Customer.SelectCustomers);
  }

  // getCustomerById(id:any){
  //   return this.http.get<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Customer.Customer+`/${id}`);
  //  }

  getCustomerByName(name:any){
    return this.http.get<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Customer.GetCustomerByName+`?name=${name}`);
   }

  addCustomer(customer:any){
    return this.http.post<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Customer.InsertCustomer,customer)
  }

  verifyCustomer(customer:any){
    return this.http.post<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Customer.VerifyCustomer,customer)
  }

  updateCustomer(id:any, customer:any){
    return this.http.put<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Customer.Customer+`/${id}`,customer)
  }

  deleteCustomer(id:any){
    return this.http.delete<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Customer.Customer+`/${id}`)
  }

  login(customer:any){
    return this.http.post<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Customer.Login,customer)
  }

  forgotPassword(customer:any){
    return this.http.post<any>(APP_DI_CONFIG.parentDomain+APP_DI_CONFIG.endPoints.Customer.ForgotPassword,customer)
  }



}
