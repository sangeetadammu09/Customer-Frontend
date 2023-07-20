import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MasterService } from '../service/master.service';
import { CustomerService } from '../service/customer.service';
import { decodeToken } from 'src/app/utils/token';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted :boolean = false;
  decodedToken!:any;
  loginText = "Login"
  loggedInBoolean: boolean = false;
  @ViewChild('mypassword') mypassword:any;
  @ViewChild('resetEmailRef') resetEmailRef:any;
  resetEmail = null;
  isResetValidation: boolean =false;
  emailResetText = null;


 constructor( private _router: Router, private _fb: FormBuilder,
  private _toastrService: ToastrService, private masterService: MasterService, private customerService: CustomerService) { 
    this.loginForm = this._fb.group({
       username : ['', Validators.required],
       password : ['', Validators.required]
    })
 }


 ngOnInit(): void {
 }

 get f() {return this.loginForm.controls;}

 login(){
   this.submitted = true;
   if(this.loginForm.valid){
     localStorage.clear();
     this.loginText = "Please Wait! Logging In";
     let loginFormData :any = {};
     loginFormData.userName = this.loginForm.controls['username'].value;
     loginFormData.password = this.loginForm.controls['password'].value;
   
     this.customerService.login(loginFormData).subscribe((data:any) => {      
       if(data){   
        localStorage.setItem('customerToken', data.token);   
         this.decodedToken = decodeToken(data.token);
         this.loginText = "Login";
         console.log(this.decodedToken,'decodedToken');

         this.masterService.saveUser(this.decodedToken.customerId);
        
         this._toastrService.success('Logged in successfully!');
         this._router.navigate(['/customer'])
       } 
      },(error:HttpErrorResponse)=>{
         //console.log(error)
         this._toastrService.error(error.error.error)
         this.loginText= 'Login'
       }
     )
      
   }else{
     console.log('invalid login')
   }
 }

 showpassword() {
   var passwordType = this.mypassword.nativeElement.type;
   if (passwordType == "password") {
     this.mypassword.nativeElement.type = "text";
   } else {
     this.mypassword.nativeElement.type = "password";
   }
 }

 resetCustomerPassword(){
   if(this.resetEmail == null){
    this.isResetValidation = true;
    this.resetEmailRef.nativeElement.style.border = "1px solid red";
   }else{
    let emailPayload:any = {};
    emailPayload.email = this.resetEmail;
    this.customerService.forgotPassword(emailPayload).subscribe((data:any) => {
      console.log(data)
      if(data.status == 200){
        this.emailResetText = data.message;
      }
    })
   }
 }

}
