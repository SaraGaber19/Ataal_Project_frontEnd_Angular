import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProblemService {

  constructor(private http:HttpClient) { }
  AddProblem(data:any){
    return this.http.post("http://ataal.somee.com/api/Customer",data)
 }
 GetAllSections():Observable<any>{
  return this.http.get("http://ataal.somee.com/api/Section/AllSectionWithoutDetails")
 }
 Payment(data:any){
  return this.http.post("http://ataal.somee.com/api/Stripe/payment/add",data)
 }
 getProblemById(problemId:number):Observable<any>{
  return this.http.get(`http://ataal.somee.com/api/Problem/${problemId}`)
 }

 getKeyWordsBySectionName(SectionId:number):Observable<any>{
  return this.http.get(` http://ataal.somee.com/api/Keywords/GetAllKeyWordsBySectionId/${SectionId}`)



 }

 getOfferById(OfferId:number):Observable<any>{
  return this.http.get(`http://ataal.somee.com/api/Offer/offer/${OfferId}`)


 }
 AcceptOffer(AcceptData:any):Observable<any>{
  return this.http.post(`http://ataal.somee.com/api/Problem/CustomerAcceptOffer`,AcceptData)


 }

 UpdateProblem(ProblemId:number,Data:any):Observable<any>{
  return this.http.post(`http://ataal.somee.com/api/Customer/update_Problem/${ProblemId}`,Data)


 }



}
