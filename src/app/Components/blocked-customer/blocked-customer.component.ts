import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TechnicalProfileServicesService } from 'src/app/Services/technical-profile-services.service';

@Component({
  selector: 'app-blocked-customer',
  templateUrl: './blocked-customer.component.html',
  styleUrls: ['./blocked-customer.component.scss']
})
export class BlockedCustomerComponent {
  constructor(private myservice: TechnicalProfileServicesService, private myroute:ActivatedRoute,){}

  AllBlockedCustomers:any;

  ngOnInit(): void {
  this.myservice.GetAllBlockedCustomers(this.myroute.snapshot.params["id"]).subscribe(
    {
      next: (data)=>{
          this.AllBlockedCustomers = data;
          console.log("all blocked technicals");
          console.log(data);
      },
      error: (err)=> {
        console.log(err);
      }
    });
  }

  UnBlock(Customer: any){
    console.log("Customer");
    console.log(Customer);
    this.myservice.UnBlockCustomer(this.myroute.snapshot.params["id"], Customer.customerId).subscribe
    (
      {
        next: (data) => {
            console.log(data)
        },
        error: (err)=> {
          console.log(err);
        }
      });
  }

}
