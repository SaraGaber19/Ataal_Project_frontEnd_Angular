import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { GlobalVaribaleService } from './global-varibale.service';
@Injectable({
  providedIn: 'root'
})
export class SideBarService {

  constructor(private myClient:HttpClient, private globalVar: GlobalVaribaleService) { }



  URL = "https://localhost:"+this.globalVar.PortNumber+"/api/Technical/SideBarInfo";


  //!Edit
  getUserByID(id:number):Observable<any>
  {

    return this.myClient.get(this.URL+`/${id}`);

  }

//   addUser(user:any)
//   {
//     return this.myClient.post(this.URL,user);
//   }

//   updateUser(user:any,id:any)
//   {
//     return this.myClient.put(this.URL+'/'+id,user);
//   }
//   deleteUser(id:any)
//   {
//     return this.myClient.delete(this.URL+'/'+id);
//   }
}
