import { Component, OnInit,OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { Technican } from '../../Models/technican';
import { ActivatedRoute } from '@angular/router';
import { interval, Observable, Subscription,EMPTY } from 'rxjs';
import { repeat, take } from 'rxjs/operators';
import { SectionService } from 'src/app/Services/Section_Custom_Serviices/section.service';
import { AuthService } from 'src/app/Services/Auth_Services/auth.service';


@Component({
  selector: 'app-section-customer',
  templateUrl: './section-customer.component.html',
  styleUrls: ['./section-customer.component.scss',"../../../assets/style.css"]
})
export class SectionCustomerComponent implements OnDestroy ,OnInit {
  rateNumber:number=0;
  Section_Problems:any;
  technicians$: Observable<Technican[]> | undefined;
  currentTechnician: Technican | undefined;
   close:boolean=false;
   Technicans:any;
   techId:number=0;
   probId:number=0;
   UnSub:Subscription[]=[]
   currentId:number=0;
   sub: Subscription = new Subscription;

  myParameter:any
  Id:any;
  private subscriptions: Subscription[] = [];

  constructor(private SectionService: SectionService,private route: ActivatedRoute,private Auth:AuthService) { }
  ngOnDestroy(): void {

    this.subscriptions.forEach(subscription => subscription.unsubscribe());

  }


  ngOnInit(): void {



    this.route.paramMap.subscribe((params) => {
     if(this.Id !=params.get('id')){

      if (this.subscriptions.length!=0) {

        this.subscriptions.forEach(subscription => subscription.unsubscribe());

      this.currentTechnician=undefined;
      this.rateNumber=0;
     }


      this.Id = params.get('id');

      this.getSectionTech( this.Id )
     }


      this. SectionService.getSectionWithDetails(this.Id).subscribe((data)=>{console.log(data.sectionProblemReadDtos)

        this.Section_Problems=data.sectionProblemReadDtos;
        console.log( this.Section_Problems=data.sectionProblemReadDtos)
        this.getSectionTech( this.Id )
      }
        )

          this.SectionService.getTechnicans(this.Id).subscribe((data)=>{
    this.Technicans=data
    console.log(data)
  })

    });




}

  Close(){
       this.close=true;
  }

  sendTec(id:number){
this.techId=id;
console.log(this.techId)
  }

  sendProbId(id:number){
    this.probId=id;
  }

  SendRecom(){
console.log("sara")
    var data={
      CustomerId:this.Auth.UserId,
      ProblemId: this.probId,
      TechnicalId:this.techId,
      Date:new Date ()
    }
    this. SectionService.sendRecom(data).subscribe((data)=>{console.log(data)})
  }
getSectionTech(SecId:any){

  this.technicians$ = this. SectionService.getSideBarTechnical(SecId); // about sidebar that you will open

  const rotationTimer$ = interval(3000);
this.technicians$.subscribe((technicians: Technican[]) => {
 const sub=   rotationTimer$.pipe(
  take(technicians.length),
  repeat(),
).subscribe((i) => {
  this.currentTechnician = technicians[i % technicians.length];
// console.log(this.currentTechnician.rate);
this.rateNumber=this.currentTechnician.rate
   // Use modulo to loop through the array
});
this.subscriptions.push(sub);
});

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
