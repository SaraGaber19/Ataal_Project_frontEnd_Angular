import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalVaribaleService } from './global-varibale.service';

@Injectable({
  providedIn: 'root'
})
export class TechnicalProfileServicesService {

  constructor(private myClient:HttpClient, private globalVar: GlobalVaribaleService) { }


  URL1 = "https://localhost:"+this.globalVar.PortNumber+"/api/Technical/";
  url2="https://localhost:"+this.globalVar.PortNumber+"/api/Customer/GetBlockedCustomers/"

  url3="https://localhost:"+this.globalVar.PortNumber+"/api/Customer/UnBlockCustomer"


  //!Edit
  getTechnicalByID(id:any)
  {
    return this.myClient.get(this.URL1+`TechnicalProfile/${id}`);

  }





  updateTechnicalProfile(technical: any): Observable<any> {   ///// commmmment sara
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    //!Edit
    return this.myClient.put<any>(`${this.URL1}update/${technical.id}`, technical, httpOptions);

  }


  GetAllBlockedCustomers(TechnicalId: any){
    return this.myClient.get(this.url2+TechnicalId);
  }

  UnBlockCustomer(TechnicalId:any, CustomerId:any): Observable<any>{

    //!don`t forget to edit this
    // const body = { TechnicalId: TechnicalId, CustomerId: CustomerId};
    const body = { TechnicalId: TechnicalId, CustomerId: CustomerId};
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.myClient.post<any>(this.url3, body, httpOptions);
  }
}
