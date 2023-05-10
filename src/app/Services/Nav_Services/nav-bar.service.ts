import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavBarService {

getNotificationNumber(customerId:number):Observable<any>
{
  return this.http.get(`http://ataal.somee.com/api/Customer/GetAllNotification/${customerId}`)
}
getNotification(customerId:number):Observable<any>
{
  return this.http.get(`http://ataal.somee.com/api/Customer/GetAllNotificationData/${customerId}`)
}


  constructor(private http:HttpClient) {


   }
}
