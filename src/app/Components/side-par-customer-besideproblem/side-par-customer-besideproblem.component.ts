import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/Services/Auth_Services/auth.service';
import { DetailedProlemService } from 'src/app/Services/detailed-prolem.service';
import { GlobalVaribaleService } from 'src/app/Services/global-varibale.service';

@Component({
  selector: 'app-side-par-customer-besideproblem',
  templateUrl: './side-par-customer-besideproblem.component.html',
  styleUrls: ['./side-par-customer-besideproblem.component.scss']
})
export class SideParCustomerBesideproblemComponent {
  constructor(private myservice: DetailedProlemService, private myroute:ActivatedRoute,
    private router: Router, private GlobalVar: GlobalVaribaleService ,
    private Auth:AuthService){

  }

  portNumber = this.GlobalVar.PortNumber;
  Customer:any;
  block:any;
  TechId:number=0;
ngOnInit(): void {


  this.Auth.UserId.subscribe(
    ()=>{
  if(this.Auth.UserId.getValue()!=null){
this.TechId=this.Auth.UserId.getValue();

  }})

  this.myservice.getUserByID(this.myroute.snapshot.params["id"]).subscribe(
    {
      next: (data)=>{
        this.Customer = data;
        console.log("customer for side bar===========================");
        console.log(this.Customer);

      },
      error: (err)=>{

        console.log(err)}
    });
}

//!Edit
blockCustomer(){
  this.block  =
  {
    "customerId": this.Customer.id,
    "technicalId": this.TechId
  }
  this.myservice.blockCustomer(this.block).subscribe(                     //after lohin need replace
    {
      next: (data)=>{
        console.log(data);
        this.router.navigate(['/HomeTechnical']);
        console.log("hossam hossam hossam")
      },
      error: (err)=>{

        console.log(err)}
    });
}
}


