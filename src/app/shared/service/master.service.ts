import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

const TOKEN_KEY = 'auth-token';;
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class MasterService {


  constructor(private router: Router) { }

  isLoggedIn(){
    return localStorage.getItem('customerToken') != null;
  }

  isLoggedOut(){
    localStorage.clear();
    return this.router.navigate(['/'])
  }

  public saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.localStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: any): void {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, user);
  }

  
}

