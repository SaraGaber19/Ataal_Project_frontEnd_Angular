import { Component, OnInit } from '@angular/core';
import { Technican } from '../../Models/technican';

import { interval, Observable } from 'rxjs';
import { repeat, take } from 'rxjs/operators';
import { SectionService } from 'src/app/Services/Section_Custom_Serviices/section.service';

@Component({
  selector: 'app-customer-sections',
  templateUrl: './customer-sections.component.html',
  styleUrls: ['./customer-sections.component.scss',"../../../assets/style.css"]
})
export class CustomerSectionsComponent implements OnInit {
  rateNumber:number=0;
  Section_Problems:any;
  technicians$: Observable<Technican[]> | undefined;
  currentTechnician: Technican | undefined;
   close:boolean=false;
   Technicans:any;
   techId:number=0;
  constructor(private SectionService: SectionService) { }

  ngOnInit(): void {
    this.technicians$ = this. SectionService.getSideBarTechnical(1); // about sidebar that you will open

    const rotationTimer$ = interval(3000);
    this.technicians$.subscribe((technicians: Technican[]) => {
  rotationTimer$.pipe(
    take(technicians.length),
    repeat(),
  ).subscribe((i) => {
    this.currentTechnician = technicians[i % technicians.length];
 console.log(this.currentTechnician.rate);
this.rateNumber=this.currentTechnician.rate
     // Use modulo to loop through the array
  });
});

this. SectionService.getSectionWithDetails(1).subscribe((data)=>{console.log(data.problemWithCustomerDtos)

  this.Section_Problems=data.problemWithCustomerDtos;
  console.log( this.Section_Problems[0].customerDto.frist_Name)
}
  )


  this.SectionService.getTechnicans(1).subscribe((data)=>{
    this.Technicans=data
    console.log(data)
  })
}




  Close(){
       this.close=true;
  }

  sendTec(id:number){
this.techId=id;
console.log(this.techId)
  }


}
