import { Injectable } from '@angular/core';

import { HttpClient} from '@angular/common/http';

import { Observable} from 'rxjs';
import { BlockedTechnican } from 'src/app/Interfaces/blocked-technican';
import { Recommenation } from 'src/app/Interfaces/recommenation';

@Injectable({
  providedIn: 'root'
})
export class SectionService {



  getSideBarTechnical(SectionId:number):Observable<any>
  {
    return this.http.get(`https://localhost:7273/api/Section/GetAllTechnicalsForCustomerSectionsSideBar/${SectionId}`)
  }


  getSectionWithDetails(SectionId:number):Observable<any>
  {
    return this.http.get(`https://localhost:7273/api/Section/GetSectionWithDetailsCustomerNeeds?id=${SectionId}`)
  }
  getTechnicans(SectionId:number){

    return this.http.get(`https://localhost:7273/api/Technical/GetAllTechnicalsForSectionId/${SectionId}`)
  }

 sendRecom(data:Recommenation):Observable<any>{

    return this.http.post(`https://localhost:7273/api/Recommendation/AddingRecommendation`,data)
  }






  constructor(private http:HttpClient) { }
}

