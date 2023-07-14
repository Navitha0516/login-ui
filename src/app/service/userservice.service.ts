import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserserviceService {
  private url = 'https://snapkaro.com/eazyrooms_staging/api/user_registeration';
   
  constructor(private httpClient: HttpClient) { }
  
  create(data: any){
    //post call for register form 
    return this.httpClient.post(this.url, JSON.stringify(data));
  }
}
