import { Component, EventEmitter, Input,OnInit,Output } from '@angular/core';

 import { AuthService } from 'src/app/Services/Auth_Services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProblemService } from 'src/app/Services/Problem/problem.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  ngOnInit(): void {
    this.Auth.UserId.subscribe(
      ()=>{
    if(this.Auth.UserId.getValue()!=null){
  this.customerId=this.Auth.UserId.getValue();

    }})
  }
  Message:string="ddddd";
  Pay:boolean=false;
  ok:boolean=false;
  customerId:number=0;
  @Output() dataEvent = new EventEmitter<boolean>();

  // @Input() problemId:number=0;
  Payment:FormGroup=new FormGroup({

    'Credit_Num':new FormControl('',[Validators.required,Validators.maxLength(16),Validators.minLength(16)]),
    'CVC':new FormControl('',[Validators.required,Validators.maxLength(3),Validators.minLength(3)]),
    'Exp':new FormControl('',[Validators.required,Validators.pattern("^[0-9]{2}/[0-9]{2}$")])

      })



      submitPayment(){

            if(this.Payment.invalid){
              return;
            }

const Data={
  "customerId":this.customerId,
  //"problemId": this.problemId,
  "cardNumber": this.Payment.value.Credit_Num,
  "expirationYear": this.Payment.value.Exp.split("/")[1],
  "expirationMonth": this.Payment.value.Exp.split("/")[0],
  "cvc": this.Payment.value.CVC
}

// console.log(this.problemId)

     this.ProblemServ.Payment(Data).subscribe((data)=>{
      console.log(data)
this.Message="Payment completed successfully"
this.Pay=true;
this.ok=true;
this.dataEvent.emit(this.ok);
 },(error)=>{
console.log(error)
this.Pay=true;
this.Message="Invalid Payment Please Try Again"

     })


          }


          close(){
            this.Pay=false;
          }
          Ok(){
            this.Pay=false;

          }


          constructor(private ProblemServ:ProblemService , private _Router:Router,private Auth:AuthService){}
        }




