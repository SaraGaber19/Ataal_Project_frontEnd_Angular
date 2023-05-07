import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalVaribaleService } from './global-varibale.service';

@Injectable({
  providedIn: 'root'
})
export class SectionService {

  constructor(private myClient:HttpClient, private globalVar: GlobalVaribaleService) { }

  URL = "https://localhost:"+this.globalVar.PortNumber+"/api/Section/GetaAllSectionsNamesAndId";



  GetAllSetionsNamesAndId()
  {
    return this.myClient.get(this.URL);
  }


}
