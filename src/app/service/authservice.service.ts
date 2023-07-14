import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  currentUser: any;
  loginURL = 'https://snapkaro.com/eazyrooms_staging/api/userlogin';

  constructor(private http: HttpClient,private route: Router) {
      this.currentUser = localStorage.getItem('currentUser');
  }
 

  login(data: any) {
    //post call for login form
      return this.http.post(this.loginURL, JSON.stringify(data));
  }


}
