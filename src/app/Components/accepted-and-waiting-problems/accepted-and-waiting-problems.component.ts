import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BrowseAllJobsService } from 'src/app/Services/browse-all-jobs.service';
import * as moment from 'moment';
import { AuthService } from 'src/app/Services/Auth_Services/auth.service';

@Component({
  selector: 'app-accepted-and-waiting-problems',
  templateUrl: './accepted-and-waiting-problems.component.html',
  styleUrls: ['./accepted-and-waiting-problems.component.scss']
})
export class AcceptedAndWaitingProblemsComponent {

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



  this.myservice.GetAll_offerdProblems(this.TechId).subscribe(
    {
      next: (data)=>{
        this.SolvedProblems = data;
        console.log(this.SolvedProblems);
      }
    });
  }

}
