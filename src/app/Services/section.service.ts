import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalVaribaleService } from './global-varibale.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SectionService {

  constructor(private myClient:HttpClient, private globalVar: GlobalVaribaleService) { }

  URL = "http://ataal.somee.com/api/Section/GetaAllSectionsNamesAndId";



  GetAllSetionsNamesAndId()
  {
    return this.myClient.get(this.URL);
  }

  GetAllSetions():Observable<any>
  {
    return this.myClient.get("http://ataal.somee.com/api/Section/AllSectionWithoutDetails")
  }
  GetAllSetionsForTech(id:number):Observable<any>
  {
    return this.myClient.get(`http://ataal.somee.com/api/Section/GetaAllSectionsForTechnical/${id}`)
  }


}
