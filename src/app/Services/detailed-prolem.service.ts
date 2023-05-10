import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalVaribaleService } from './global-varibale.service';

@Injectable({
  providedIn: 'root'
})
export class DetailedProlemService {

  constructor(private myClient:HttpClient,private globaLVar: GlobalVaribaleService) { }

    // URL = "https://localhost:44344/api/Technical/SideBarInfo";
    URL1 = "http://ataal.somee.com/api/Problem/Customer";
    URL2 = "http://ataal.somee.com/api/Customer/BlockCustomer";
    URL3 = "http://ataal.somee.com/api/Problem/";
    URL4 = "http://ataal.somee.com/api/Technical/GetPoints/";
    URL5 = "http://ataal.somee.com/api/Offer";                          //make offer
    URL6 = "http://ataal.somee.com/api/Offer/offer/";
    URL7 = "http://ataal.somee.com/api/Offer/";                          //delete
    URL8 = "http://ataal.somee.com/api/Technical/decrese/";                          //delete


    // getAllUsers(){
    //   return this.myClient.get(this.URL);
    // }


    //!Customer Id Here
    getUserByID(id:any)
    {
      return this.myClient.get(this.URL1+`/${id}`);
    }

    blockCustomer(body:any){
      return this.myClient.post(this.URL2,body);
    }


    getdetailedProblem(id:any){
      return this.myClient.get(this.URL3+id);

    }

    getPoints(id:any)
    {
      return this.myClient.get(this.URL4+id);
    }


    makeOffer(body:any){
      return this.myClient.post(this.URL5,body);
    }




    aleardyOffer(technicalID:any,problemID:any)
    {
      return this.myClient.get(this.URL6+technicalID+'/'+problemID);
    }


    deleteOffer(technicalID:any,problemID:any)
    {
      return this.myClient.delete(this.URL7+technicalID+'/'+problemID);

    }

    decreasePoints(id:any)
    {
      return this.myClient.get(this.URL8+id);
    }
}

