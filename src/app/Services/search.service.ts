import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GlobalVaribaleService } from './global-varibale.service';
@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private myClient:HttpClient, private globalVar: GlobalVaribaleService) { }

  private searchQuerySource = new BehaviorSubject<string>('');

  searchQuery$ = this.searchQuerySource.asObservable();

  setSearchQuery(query: string) {
    this.searchQuerySource.next(query);
  }


  // https://localhost:44344/7?query=c

  URL = "https://localhost:"+this.globalVar.PortNumber+"/api/Search";
  GetResultOfSearch(query:string, TechnicalId:any){
     return this.myClient.get(this.URL+"/1"+"?query="+query);
  }
BlockTech(data:any){
    return this.myClient.post("https://localhost:7273/api/Customer/BlockTechnical",data);
 }

 SendReview(data:any){

  return this.myClient.post("https://localhost:7273/api/Customer/Review",data);
 }

}
