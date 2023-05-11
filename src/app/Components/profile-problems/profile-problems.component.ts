import { NgxSpinnerService } from "ngx-spinner";

import { Component ,OnInit} from '@angular/core';
import { CustomerService } from 'src/app/Services/Customer_Servides/customer.service';
import { Problem } from 'src/app/Interfaces/problem';
import { EMPTY } from 'rxjs';
import { AuthService } from 'src/app/Services/Auth_Services/auth.service';

@Component({
  selector: 'app-profile-problems',
  templateUrl: './profile-problems.component.html',
  styleUrls: ['./profile-problems.component.scss']
})
export class ProfileProblemsComponent  implements OnInit{
  Problems:Problem[]=[];
  date:string="";
ProblemId:number=0
Current:any;
rate:number=0;
customerId:number=0;
constructor(private customer :CustomerService,private Auth:AuthService, private spinner:NgxSpinnerService){}
ngOnInit(): void {
this.spinner.show()
  this.Auth.UserId.subscribe(
    ()=>{
  if(this.Auth.UserId.getValue()!=null){
this.customerId=this.Auth.UserId.getValue();
this.customer.getproblemsForCustomer(this.customerId).subscribe((data)=>{
  console.log(data)
  this.Problems=data
  this.spinner.hide();
  // this.date= this.Problems.date


})
  }})

}
sendrate(rate:number){
this.rate=rate;
console.log(this.rate);
}
sendProblemId(Id:number){
this.ProblemId=Id
this.Deleted=false;

console.log(Id)
this.Current= this.Problems.find((u:Problem)=> u.id ==Id);
console.log(this.Current);
}
AssignAsSolved(){
  this.customer.AssignProblemAsSolved(this.ProblemId).subscribe((data)=>{console.log(data)})
  if(this.rate>0){
const data={
  "customerId": this.customerId,
  "technicalId": this.Current.techId,
  "rateValue": this.rate
}
  this.customer.SendRate(data).subscribe((data)=>{console.log(data)})


  }
}
Deleted:boolean=false;

Delete(){
  this.Auth.DeleteProblem(this.ProblemId).subscribe((data)=>{
    console.log(data)
  })

}
SendIdForDelete(id:number){
this.ProblemId=id;
this.Deleted=true;
}



getDate(dateString: string): string {
  const NotificationDate = new Date(dateString);
  const diffMs = new Date().getTime() - NotificationDate.getTime();
  const diffMins = Math.round(diffMs / 60000); // convert to minutes
  if (diffMins < 60) {
    return `${diffMins} minute${diffMins === 1 ? '' : 's'} ago`;
  } else if (diffMins < 1440) {
    const diffHours = Math.floor(diffMins / 60);
    return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
  } else {
    const diffDays = Math.floor(diffMins / 1440);
    return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
  }
}
}


