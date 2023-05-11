import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/Services/Auth_Services/auth.service';
import { DetailedProlemService } from 'src/app/Services/detailed-prolem.service';
import { GlobalVaribaleService } from 'src/app/Services/global-varibale.service';

@Component({
  selector: 'app-detailed-problem',
  templateUrl: './detailed-problem.component.html',
  styleUrls: ['./detailed-problem.component.scss'],
})
export class DetailedProblemComponent implements OnInit {
  problem: any;
  points: any;
  offerSalary: any = 0;
  offerMassege: any = '';



  //!Ediiiiit
  technicalid: any = 0;
  offerState_forSucsees_message: any = false;                                  //for make offer succefully

  offerObject: any;                                                           //is that techbical have offer for this problem

  closeResult = '';

  constructor(
    private myservice: DetailedProlemService,
    private myroute: ActivatedRoute,
    private router: Router,
    private globalVar: GlobalVaribaleService,
    private Auth: AuthService,
    private spinner:NgxSpinnerService
  ) {}


  portNumber = this.globalVar.PortNumber;

  ngOnInit(): void {

    this.Auth.UserId.subscribe(
      ()=>{
    if(this.Auth.UserId.getValue()!=null){
  this.technicalid=this.Auth.UserId.getValue();
  this.myservice.getPoints(this.technicalid).subscribe(
    //erroe in passing must send technical id
    {
      next: (data) => {
        this.points = data;

      },
      error: (err) => {
        console.log(err);
      },
    }
  );

  this.myservice.getdetailedProblem(this.myroute.snapshot.params['id']).subscribe({
      next: (data) => {
        this.problem = data;



        this.myservice
        .aleardyOffer(this.technicalid,this.problem.id)
        .subscribe({
          next: (data) => {
            this.offerObject = data;

            if(this.offerObject!=null)
            {
              this.offerSalary = this.offerObject.offerSalary;
              this.offerMassege = this.offerObject.offerMassege;
            }
            else if(this.offerObject==null) {
            }
          },
          error: (err) => {
            console.log(err);

          },
        });

      },
      error: (err) => {
        console.log(err);
      },
    });

    }})






  }

  makeOffer(offer:any,message:any) {
    this.offerObject = {
      technicalid: this.technicalid,
      problemID: this.problem.id,
      offerSalary: offer,
      offerMassege: message,
    };
    this.myservice.makeOffer(this.offerObject).subscribe({
      next: (data) => {
        console.log(data);

        this.myservice.decreasePoints(this.technicalid).subscribe({
          next: (data) => {
            console.log(data)
          },
          error: (err) => {
            console.log(err);
          },
        });

      },
      error: (err) => {
        console.log(this.offerObject);
        console.log("hossam Metwally      ddddddddddddddddddddddddd")

        console.log(err);
      },
    });
  }

  EditOffer(offer:any,message:any){
    this.offerObject = {
      technicalid: this.technicalid,
      problemID: this.problem.id,
      offerSalary: offer,
      offerMassege: message,
    };
    this.myservice.deleteOffer(this.technicalid,this.problem.id).subscribe({
      next: (data) => {
        console.log(data);
        console.log('hossam hossam hossam');
        this.makeOffer(offer,message);

      },
      error: (err) => {
        console.log(this.offerObject);
        console.log(err);
      },
    });
  }

  // open(content:any) {
  //   this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
  //     (result) => {
  //       this.closeResult = `Closed with: ${result}`;
  //     },
  //     (reason) => {
  //       this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //     },
  //   );
  // }
  // private getDismissReason(reason: any): string {
  //   if (reason === ModalDismissReasons.ESC) {
  //     return 'by pressing ESC';
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return 'by clicking on a backdrop';
  //   } else {
  //     return `with: ${reason}`;
  //   }
  // }
}
