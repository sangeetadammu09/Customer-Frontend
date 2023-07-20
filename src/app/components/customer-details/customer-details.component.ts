import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from 'src/app/shared/service/customer.service';
import * as moment from 'moment';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {

  customerData:any={}
  fetchedData:any;
  customerId: any;
  @ViewChild('closedeleteCustomerBtn') closedeleteCustomerBtn:any;
  @Output() onCustomerDeleteEvent = new EventEmitter();
  updateCustomerForm: FormGroup;
  updateCustomerAddressForm!: FormGroup;
  viewMode = 'tab1';
  submittedA:boolean = false;
  submittedB:boolean = false;
  addCustomerTitle ="Add Customer | Login Details";
  isUserNameExists: boolean = false;
  updateCustomerData = new FormData();
  customerImageFile:any;
  @ViewChild('closeaddCustomerBtn') closeaddCustomerBtn:any;
  customerImageFileName: any;
  deletedCustomer: any;
  searchCustomer : string ='';


  constructor(private customerService: CustomerService, private _formBuilder : FormBuilder, private _toastrService: ToastrService) {
    this.customerService.selectedCustomer.subscribe((data: any) => {
      this.fetchedData = data;
      if(this.fetchedData != null) {
        this.customerData = data;
      }  
    })
    this.updateCustomerForm = this._formBuilder.group({
      firstName: ['', [Validators.required,Validators.pattern('^[a-zA-Z ,]*$')]],
      lastName: ['', [Validators.required,Validators.pattern('^[a-zA-Z ,]*$')]],
      userName:['',Validators.required],
      email: ['', [Validators.required,  Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),]],
      phone: ['', [Validators.required,  Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"),]],
      gender : ['',Validators.required],
      dob : ['', Validators.required],
      isActive: [true, Validators.required],
    })
    this.updateCustomerAddressForm = this._formBuilder.group({
      address: ['', Validators.required],
      landMark: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      zipCode: ['', Validators.required],
      image: [],
    });
   }

  ngOnInit(): void {
    this.getCustomerInfo();
  }

  get f(){ return this.updateCustomerForm.controls};
  get g(){ return this.updateCustomerAddressForm.controls};

  getCustomerInfo(){ 
    if(this.fetchedData == null) {
    this.customerService.getAllCustomers().subscribe((data:any)=>{
      if(data.status == 200){
      this.customerData = data.data[0];
     
      }
    })
  }
  }

  openDeleteModal(customerData:any){
    this.customerId = customerData.customerId;
  }

  deleteCustomer(){
    this.customerService.deleteCustomer(this.customerId).subscribe((data:any)=>{
      if(data.status == 200){
        this.closedeleteCustomerBtn.nativeElement.click();
        this._toastrService.success('Customer deleted successfully');
        this.customerService.sendDeletedCustomerInfo(data.message);
        this.getCustomerInfo();
      }else{
        this._toastrService.success('Failed deleting customer')
      }
    },(error:any) => {
      if(error.status == 500){
      this._toastrService.error('Some Error Encountered');
      }
     })
  }

  openUpdateModal(customer:any){
    this.submittedA = false;
    this.submittedB = false;
    this.isUserNameExists = false;
    this.customerId = customer.customerId;
    this.updateCustomerForm.patchValue({
      firstName: customer.firstName,
      lastName: customer.lastName,
      userName: customer.userName,
      email: customer.email,
      phone: customer.phone,
      gender : customer.gender,
      dob :new Date(customer.dob).toISOString().substring(0,10),
    })
    
    this.updateCustomerForm.controls['isActive'].setValue(JSON.stringify(customer.isActive));
    this.updateCustomerAddressForm.patchValue({
      address: customer.address.address,
      landMark: customer.address.landmark,
      city: customer.address.city,
      state: customer.address.state,
      country: customer.address.country,
      zipCode: customer.address.zipCode,
    })
  }

  updateCustomerTab(){
    this.addCustomerTitle ="Edit Customer | Login Details";
    this.viewMode = 'tab1'
  }

  updateCustomerAddressTab(){
    this.addCustomerTitle ="Edit Customer | Profile Details";
    this.viewMode = 'tab2'
  }

  verifyUserName(event:any){
    let userName ={'userName' : event.target.value};
    this.customerService.verifyCustomer(userName).subscribe((data:any) =>{
      if(data.status == 200){
        this.isUserNameExists = false;
      } 
    },(err:HttpErrorResponse)=>{
      (err.status == 409) ? this.isUserNameExists = true : this.isUserNameExists = false;
    })
}


updateCustomer(){
  this.submittedA = true;
  console.log(this.updateCustomerForm.value)
   if(this.updateCustomerForm.valid){      
      this.updateCustomerData.append('firstName',this.updateCustomerForm.controls['firstName'].value);
      this.updateCustomerData.append('lastName',this.updateCustomerForm.controls['lastName'].value);
      this.updateCustomerData.append('userName',this.updateCustomerForm.controls['userName'].value);
      this.updateCustomerData.append('email',this.updateCustomerForm.controls['email'].value);
      this.updateCustomerData.append('phone',this.updateCustomerForm.controls['phone'].value);
      this.updateCustomerData.append('dob',moment(this.updateCustomerForm.controls['dob'].value).format('YYYY-MM-DD'));
      this.updateCustomerData.append('gender',this.updateCustomerForm.controls['gender'].value);
      this.updateCustomerData.append('isActive',this.updateCustomerForm.controls['isActive'].value);
      this.viewMode = 'tab2';
    }else{
      return;
    }  

}


uploadCustomerImage(file: any) {
  this.customerImageFile='';
  this.customerImageFileName = file.target.files[0].name;
  if(this.customerImageFileName.includes('.png') || this.customerImageFileName.includes('.jpg') || this.customerImageFileName.includes('.jpeg')) {
    this.customerImageFile = file.target.files[0];
  }else{
    this._toastrService.error('Only PNG or JPG document is allowed')
  }
}

//api update customer

submitUpdateCustomerAddress(){
  this.submittedB = true;
  if(this.updateCustomerAddressForm.valid){
      this.updateCustomerData.append('address',this.updateCustomerAddressForm.controls['address'].value);
      this.updateCustomerData.append('landmark',this.updateCustomerAddressForm.controls['landMark'].value);
      this.updateCustomerData.append('city',this.updateCustomerAddressForm.controls['city'].value);
      this.updateCustomerData.append('state',this.updateCustomerAddressForm.controls['state'].value);
      this.updateCustomerData.append('country',this.updateCustomerAddressForm.controls['country'].value);
      this.updateCustomerData.append('zipCode',this.updateCustomerAddressForm.controls['zipCode'].value);
      if(this.customerImageFile){
      this.updateCustomerData.append('image', this.customerImageFile);
      }
    
      this.customerService.updateCustomer(this.customerId,this.updateCustomerData).subscribe((data:any) => {
        if(data.status == 200){
          this._toastrService.success('Customer added successfully!');
          this.closeaddCustomerBtn.nativeElement.click();
          this.getCustomerInfo();
        } 
      },(error:any) => {
       if(error.status == 500){
       this._toastrService.error('Some Error Encountered');
       }
      })
  }else{
    return;
  }
}

}
