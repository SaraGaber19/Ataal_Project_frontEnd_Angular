import { Component ,OnInit} from '@angular/core';
import { CustomerService } from 'src/app/Services/Customer_Servides/customer.service';
import { BlockedTechnican } from 'src/app/Interfaces/blocked-technican';
import { AuthService } from 'src/app/Services/Auth_Services/auth.service';

@Component({
  selector: 'app-profile-blocked-customer',
  templateUrl: './profile-blocked-customer.component.html',
  styleUrls: ['./profile-blocked-customer.component.scss']
})
export class ProfileBlockedCustomerComponent implements  OnInit {
Technicans:any
Technican_ID:number=0;
constructor(private Customer:CustomerService,private Auth:AuthService){}

Unblock(){

  this.Customer.UnBlockTechnican({customerId:this.Auth.UserId,technicalId:this.Technican_ID}).subscribe((data)=>
  console.log(data)
  )

}

sendTechnicanId(id:number){
 this. Technican_ID=id;
}





ngOnInit(): void {
  this.Customer.getBlockedCustomer(this.Auth.UserId).subscribe((data)=>{
    this.Technicans=data
  })



}










}
