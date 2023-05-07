// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class TechnicalPaymentService {

//   constructor(private myClient:HttpClient) { }

//   URL1 = "https://localhost:7273/api/Stripe/Subscribe";





//   Pay(techObject: any){
//     let body = {
//       "customerId": 1,
//       "problemId": 0,
//       "cardNumber": "5555555555554444",
//       "expirationYear": "40",
//       "expirationMonth": "10",
//       "cvc": "123",
//       "price": 10
//     }
//     return this.myClient.post(this.URL1, body);
//   }

// }

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalVaribaleService } from './global-varibale.service';

@Injectable({
  providedIn: 'root'
})
export class MyService {
  constructor(private http: HttpClient, private globalVar: GlobalVaribaleService) {}

  postRequest(technicalPay : any) {
    const url = 'https://localhost:'+this.globalVar.PortNumber+'/api/Stripe/Subscribe';
    return this.http.post(url, technicalPay);
  }
}
