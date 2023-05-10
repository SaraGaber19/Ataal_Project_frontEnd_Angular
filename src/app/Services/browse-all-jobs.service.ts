import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalVaribaleService } from './global-varibale.service';

@Injectable({
  providedIn: 'root'
})
export class BrowseAllJobsService {

  constructor(private myClient:HttpClient, private globaLVar : GlobalVaribaleService) { }

  URL = "http://ataal.somee.com/api/Problem";

  GetAllProblemsInfoBySectionId(sectionId:any,technicalId:any){
     return this.myClient.get(this.URL+'/GetAllProblemsInfoForTechnical/'+sectionId+'/'+technicalId);
  }

// this for all problems when he press find jop he gain all prolem in all section he in
// not blocked problems and not solved or assigned
  GetAllProblemsInfo(technicalId:any){
    return this.myClient.get(this.URL+'/GetAllProblemsInfoForTechnical/'+`${technicalId}`);
 }


   GetAllSsolvedProblems(TechnicalId:any){
      return this.myClient.get(this.URL+`/GetAllSolvedProblem/${TechnicalId}`)

   }
   GetAll_offerdProblems(TechnicalId:any){

    return this.myClient.get(this.URL+`/GetAllofferdProblems/${TechnicalId}`)
   }

}
