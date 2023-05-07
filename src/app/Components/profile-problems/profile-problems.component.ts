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
constructor(private customer :CustomerService,private Auth:AuthService){}
ngOnInit(): void {

  this.Auth.UserId.subscribe(
    ()=>{
  if(this.Auth.UserId.getValue()!=null){
this.customerId=this.Auth.UserId.getValue();

  }})
  this.customer.getproblemsForCustomer(this.customerId).subscribe((data)=>{
    console.log(data)
    this.Problems=data
    // this.date= this.Problems.date


  })
}
sendrate(rate:number){
this.rate=rate;
console.log(this.rate);
}
sendProblemId(Id:number){
this.ProblemId=Id

console.log(Id)
this.Current= this.Problems.find((u:Problem)=> u.id ==Id);
console.log(this.Current);
}
AssignAsSolved(){
  this.customer.AssignProblemAsSolved(this.ProblemId).subscribe((data)=>{console.log(data)})
  if(this.rate>0){
const data={
  "customerId": 2,
  "technicalId": this.Current.techId,
  "rateValue": this.rate
}
  this.customer.SendRate(data).subscribe((data)=>{console.log(data)})


  }
}



getDate(date:any){
  const Datee = new Date(date);
 return `${Datee.getDate()}/${Datee.getMonth()}/${Datee.getFullYear()}`;

  // this.realyTime=Datee.getTime()

}
getTime(date:any){
  const Datee = new Date(date);
 return `${Datee.getHours()}:${Datee.getMinutes()}:${Datee.getSeconds()} ${Datee.getHours() >= 12 ? 'PM' : 'AM'}`
  // this.realyTime=Datee.getTime()

}
}


