import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BrowseAllJobsService } from 'src/app/Services/browse-all-jobs.service';
import * as moment from 'moment';
import { AuthService } from 'src/app/Services/Auth_Services/auth.service';

@Component({
  selector: 'app-my-jobs',
  templateUrl: './my-jobs.component.html',
  styleUrls: ['./my-jobs.component.scss']
})
export class MyJobsComponent {
  TechId:number=0;
  constructor(private myservice: BrowseAllJobsService, private myroute:ActivatedRoute,private Auth: AuthService ){}

  SolvedProblems:any;


  formatDateTime(dateTime: Date): string {
    return moment(dateTime).format('YYYY-MM-DD  HH:mm:ss');
  }

ngOnInit(): void {
  this.Auth.UserId.subscribe(
    ()=>{
  if(this.Auth.UserId.getValue()!=null){

      this.TechId=this.Auth.UserId.getValue();

  }
})



  this.myservice.GetAllSsolvedProblems(this.TechId).subscribe(
    {
      next: (data)=>{
        this.SolvedProblems = data;
        console.log(this.SolvedProblems);
      }
    });
  }

}
