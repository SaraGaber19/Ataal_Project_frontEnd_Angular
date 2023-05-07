import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { BlockedTechnican } from 'src/app/Interfaces/blocked-technican';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  getBlockedCustomer(CustomerId:number):Observable<any>
  {

    return this.http.get(`https://localhost:7273/api/Customer/GetAllBlockedTechnicals/${CustomerId}`)
  }

 UnBlockTechnican(unblock_Tichnican:BlockedTechnican):Observable<any>
  {

    return this.http.post("https://localhost:7273/api/Customer/UnBlockCustomer",unblock_Tichnican)
  }
  getCustomerById(CustomerId:number):Observable<any>
  {
    return this.http.get(`https://localhost:7273/api/Customer/${CustomerId}`)
  }

  getproblemsForCustomer(CustomerId:number):Observable<any>{
    return this.http.get(`https://localhost:7273/api/Customer/GetAllProblemsForCustomer/ ${CustomerId}`)
  }
  UpdateProfile(id:number,data:any):Observable<any>{
    return this.http.put(`https://localhost:7273/api/Customer/UpdateCustomerProfile/${id}`,data)
  }

  AssignProblemAsSolved(CustomerId:number):Observable<any>{
    return this.http.put(`https://localhost:7273/api/Problem/ProblemIsSolved/${CustomerId}`,"")
  }

 SendRate(data:any):Observable<any>{
    return this.http.post(`https://localhost:7273/api/Customer/rate`,data)
  }


  constructor(private http:HttpClient) { }
}
