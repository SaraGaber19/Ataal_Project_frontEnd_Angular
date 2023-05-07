import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalVaribaleService } from './global-varibale.service';

@Injectable({
  providedIn: 'root'
})
export class BrowseAllJobsService {

  constructor(private myClient:HttpClient, private globaLVar : GlobalVaribaleService) { }

  //!Edit Here
  URL = "https://localhost:"+this.globaLVar.PortNumber+"/api/Problem";
  GetAllProblemsInfoBySectionId(sectionId:any,technicalId:any){
     return this.myClient.get(this.URL+'/GetAllProblemsInfoForTechnical/'+sectionId+'/1');
  }

//////////////////////////////////////edit
  GetAllProblemsInfo(SectionId:any){
    return this.myClient.get(this.URL+'/GetAllProblemsInfoForTechnical/'+`1`);
 }


   GetAllSsolvedProblems(TechnicalId:any){
      return this.myClient.get(this.URL+`/GetAllSolvedProblem/${TechnicalId}`)

   }

}
