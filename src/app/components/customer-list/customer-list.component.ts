import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomerService } from 'src/app/shared/service/customer.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  customers:any[] = [];
  selectedCustomer:number=0;
  viewMode = 'tab1';
  addCustomerTitle ="Add Customer | Login Details";
  addCustomerForm: FormGroup;
  addCustomerAddressForm!: FormGroup;
  submittedA:boolean = false;
  submittedB:boolean = false;
  isUserNameExists:boolean = false;
  addCustomerData = new FormData();
  customerImageFile:any;
  @ViewChild('closeaddCustomerBtn') closeaddCustomerBtn:any;
  customerImageFileName: any;
  deletedCustomer: any;
  searchCustomer : string ='';
  page: number = 0;
  

  constructor(private customerService: CustomerService,private _formBuilder : FormBuilder, private _toastrService: ToastrService) { 
    this.addCustomerForm = this._formBuilder.group({
      firstName: ['', [Validators.required,Validators.pattern('^[a-zA-Z ,]*$')]],
      lastName: ['', [Validators.required,Validators.pattern('^[a-zA-Z ,]*$')]],
      userName:['',Validators.required],
      email: ['', [Validators.required,  Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),]],
      phone: ['', [Validators.required,  Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"),]],
      gender : ['',Validators.required],
      dob : ['', Validators.required],
      password:['',Validators.required],
      confirmPassword: ['',Validators.required],
      isActive: [true, Validators.required],
    })
    this.addCustomerAddressForm = this._formBuilder.group({
      address: ['', Validators.required],
      landMark: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      zipCode: ['', Validators.required],
      image: [],
    });
    this.customerService.deletedCustomer.subscribe((data: any) => {
      this.deletedCustomer = data;
      if(this.deletedCustomer != null) {
        this.getAllCustomers();
      }  
    })
  }

  ngOnInit(): void {
    this.getAllCustomers();
   
  }

  get f(){ return this.addCustomerForm.controls};
  get g(){ return this.addCustomerAddressForm.controls};

  getAllCustomers(){
    this.customerService.getAllCustomers().subscribe((data:any)=>{
      if(data.status == 200){
      this.customers = data.data; 
        
      }
    });

  }

  viewCustomerDetails(customer:any){
    console.log(customer);
    this.selectedCustomer = customer;
      if(this.selectedCustomer){
        this.customerService.sendCustomer(this.selectedCustomer);
       
      }
  }

  openCustomerModal(){
    this.submittedA = false;
    this.submittedB = false;
    this.addCustomerForm.reset();
    this.addCustomerForm.markAsUntouched();
    this.addCustomerForm.markAsPristine();
    this.addCustomerAddressForm.reset();
    this.addCustomerAddressForm.markAsUntouched();
    this.addCustomerAddressForm.markAsPristine();
    this.isUserNameExists = false;
    this.addCustomerForm.controls['isActive'].setValue('true');
  }

  addCustomerTab(){
    this.addCustomerTitle ="Add Customer | Login Details";
    this.viewMode = 'tab1'
  }

  addCustomerAddressTab(){
    this.addCustomerTitle ="Add Customer | Profile Details";
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


  submitNewCustomer(){
    this.submittedA = true;
     if(this.addCustomerForm.valid){      
        this.addCustomerData.append('firstName',this.addCustomerForm.controls['firstName'].value);
        this.addCustomerData.append('lastName',this.addCustomerForm.controls['lastName'].value);
        this.addCustomerData.append('userName',this.addCustomerForm.controls['userName'].value);
        this.addCustomerData.append('email',this.addCustomerForm.controls['email'].value);
        this.addCustomerData.append('phone',this.addCustomerForm.controls['phone'].value);
        this.addCustomerData.append('dob',moment(this.addCustomerForm.controls['dob'].value).format('YYYY-MM-DD'));
        this.addCustomerData.append('gender',this.addCustomerForm.controls['gender'].value);
        this.addCustomerData.append('password',this.addCustomerForm.controls['password'].value);
        this.addCustomerData.append('confirmPassword',this.addCustomerForm.controls['confirmPassword'].value);
        this.addCustomerData.append('isActive',this.addCustomerForm.controls['isActive'].value);
    
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

  //api insert customer into db

  submitNewCustomerAddress(){
    this.submittedB = true;
    if(this.addCustomerAddressForm.valid){
        this.addCustomerData.append('address',this.addCustomerAddressForm.controls['address'].value);
        this.addCustomerData.append('landmark',this.addCustomerAddressForm.controls['landMark'].value);
        this.addCustomerData.append('city',this.addCustomerAddressForm.controls['city'].value);
        this.addCustomerData.append('state',this.addCustomerAddressForm.controls['state'].value);
        this.addCustomerData.append('country',this.addCustomerAddressForm.controls['country'].value);
        this.addCustomerData.append('zipCode',this.addCustomerAddressForm.controls['zipCode'].value);
        this.addCustomerData.append('image', this.customerImageFile);
      
        this.customerService.addCustomer(this.addCustomerData).subscribe((data:any) => {
          if(data.status == 200){
            this._toastrService.success('Customer added successfully!');
            this.closeaddCustomerBtn.nativeElement.click();
            this.getAllCustomers();
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

  //api to search Customer by name
  findCustomer(searchCustomer:any){
    console.log(searchCustomer);
    this.customerService.getCustomerByName(searchCustomer).subscribe((data:any) => {
      console.log(data,'data')
      if(data.status == 200){
        this.customers = data.data;
      }
    },(error:any) => {
      if(error.status == 500){
      this._toastrService.error('Some Error Encountered');
      }
     })

  }

  clearSearch(){
    this.getAllCustomers()
  }

}
