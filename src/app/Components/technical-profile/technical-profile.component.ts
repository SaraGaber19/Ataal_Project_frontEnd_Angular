import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TechnicalProfileServicesService } from 'src/app/Services/technical-profile-services.service';
import * as moment from 'moment';
import { ReportService } from 'src/app/Services/report.service';
import { GlobalVaribaleService } from 'src/app/Services/global-varibale.service';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/Services/Auth_Services/auth.service';

@Component({
   selector: 'app-technical-profile',
   templateUrl: './technical-profile.component.html',
   styleUrls: ['./technical-profile.component.scss']
})
export class TechnicalProfileComponent {

  constructor(private myservice: TechnicalProfileServicesService,
    private reportService: ReportService,
    private myroute:ActivatedRoute,private modalService: NgbModal, modalConfig: NgbModalConfig
    ,private global: GlobalVaribaleService,private Auth: AuthService) {
      // customize default modal options
      modalConfig.backdrop = 'static';
      modalConfig.keyboard = false;
    }


    openModal(content:any) {
      this.modalService.open(content, { centered: true });
    }

    Technical:any;
    Stars:any = [];
    RemainingStars:any = [];
    ShowReportBtn:boolean = false;
    TechnicalId:any;
    PortNumber = this.global.PortNumber;
    TechId:number=0;
    ngOnInit(): void {
      this.Auth.UserId.subscribe(
        ()=>{
      if(this.Auth.UserId.getValue()!=null){

          this.TechId=this.Auth.UserId.getValue();
          this.myservice.getTechnicalByID(this.TechId).subscribe(
            {
              next: (data)=>{
                this.Technical = data;
                this.TechnicalId =this.Technical.id;
                console.log("data");
                console.log(this.Technical);


                if(!this .Technical.rate){
                  for (let i = 0; i < 5; i++) {
                    this.RemainingStars [i] = i;
                  }
                }
                for (let i = 0; i < this.Technical.rate; i++) {
                  this.Stars[i] = i;
                }


                for (let i = 0; i < 5-this.Stars.length; i++) {
                  this.RemainingStars [i] = i;
                }


              },
              error: (err)=>{ console.log(err)}
            });
      }
    })






    }

    ReviewId :any;
    ShowReport(review_ID:number){
      //Assign the review id to a variable to can deal with it
      this.ReviewId = review_ID;
        this.ShowReportBtn = !this.ShowReportBtn;
    }


    formatDateTime(dateTime: Date): string {
      return moment(dateTime).format('YYYY-MM-DD      HH:mm:ss');
    }

    //Open popUp For create a report
  	openVerticallyCentered(content:any) {
      this.modalService.open(content, {centered:true})
    }

    //Make Report on a specific review
    save(){

      // this.modal.dismiss('Save click');


      const cause = (<HTMLSelectElement>document.getElementById('causeSelect')).value;
      const description = (<HTMLInputElement>document.getElementById('descriptionTextarea')).value;

      this.reportService.reportReview(this.ReviewId, this.TechnicalId, cause, description).subscribe(

        (response) => {
          console.log("Report the review successful");
          console.log(response);
        },
        (error) => {
          console.log("Report the review failed");
          console.log(error);
        }
      );


    }

  }
