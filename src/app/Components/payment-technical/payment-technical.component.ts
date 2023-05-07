import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MyService } from 'src/app/Services/technical-payment.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/Auth_Services/auth.service';


@Component({
  selector: 'app-payment-technical',
  templateUrl: './payment-technical.component.html',
  styleUrls: ['./payment-technical.component.scss']
})

export class PaymentTechnicalComponent implements OnInit{

  myForm: FormGroup;
  name: string = "";
  cardNumber="";
  date="";
  CVV:any;
  price:any;
  Techn:number=0;
  status:boolean = false;
  constructor(private route: ActivatedRoute,private myservice: MyService,private router: Router, private Auth: AuthService,) {
    this.myForm = new FormGroup({
      myInputName: new FormControl('',Validators.required),
      myInput: new FormControl('', [Validators.required, Validators.maxLength(19), Validators.minLength(19)]),
      myInputDate: new FormControl('', [Validators.required, Validators.maxLength(5), Validators.minLength(5)]),
      myInputCVV: new FormControl('', [Validators.required, Validators.maxLength(4), Validators.minLength(3)]),
    });
  }

  ngOnInit(): void {
    this.Auth.UserId.subscribe(
      ()=>{
    if(this.Auth.UserId.getValue()!=null){
  this.Techn=this.Auth.UserId.getValue();

    }})
    this.price = this.route.snapshot.paramMap.get("price");
  }




  onKeyDown(event: KeyboardEvent) {
    // Allow only numeric keys, backspace, and delete
    const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];
    if (event.key !== ' ' && isNaN(Number(event.key)) && !allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
  }

  onModelChange(event: any) {
    // Remove all non-numeric characters
    let cardNumber = event.replace(/[^\d]/g, '');

    // Add space after every 4 digits
    cardNumber = cardNumber.replace(/(\d{4})/g, '$1 ');

    // Set the updated card number
    this.cardNumber = cardNumber.trim();
  }


  onInputData(){

    let month = this.date.substring(0, 2);
    let year = this.date.substring(3);


    let technicalPayment =
    {
      "CardNumber":this.cardNumber,
      "ExpirationMonth":month,
      "ExpirationYear":year,
      "price":this.price,
      "Cvc":this.CVV,
      "customerId":this.Techn,
      "problemId":-1
    }
    this.myservice.postRequest(technicalPayment).subscribe(
        {
          next: (data)=>{
            console.log(data)
            this.router.navigate(['/succsess']);

          },
          error: (err)=>{
            this.status = true;
             console.log(err)}
        });

  }

}






// import { Component, OnInit, Renderer2 } from '@angular/core';

// @Component({
//   selector: 'app-payment-technical',
//   templateUrl: './payment-technical.component.html',
//   styleUrls: ['./payment-technical.component.css']
// })

// export class PaymentTechnicalComponent {

//   constructor(private render: Renderer2) {
//     this.jscode();
//   }

//   private jscode() {

//     window.addEventListener("load", () => {
//       // forms
//       let inputs = document.querySelectorAll("input");
//       let ccList = document.querySelectorAll(".ccList li");
//       let name = document.querySelector(".name");
//       let year = document.querySelector(".year");
//       let inputCon = document.querySelectorAll(".inputCon");
//       let btn = document.querySelector('button');
//       //credit card
//       let cName = document.querySelector(".name");
//       let cList = document.querySelector(".creditCard ul li");
//       let cYear = document.querySelector(".creditCard .year");
//       let length = inputs.length;
//       let regExp = [/^[A-Za-z\'\s\.\,]+$/, /^4[0-9]{12}(?:[0-9]{3})?$/, /^[0-9]{3,4}$/];
//       //focusing the text->function
//       let fieldColor = (i: any) => {
//         for (let j = 0; j < inputCon.length; j++) {
//           if (i == j) {
//             //inputCon[i].style.color = "rgb(64,146,181)";
//             this.render.setStyle(inputCon[i], "color", "rgb(64,146,181)")
//           }
//           else {
//             // inputCon[j].style.color = "rgb(193,193,193)";
//             this.render.setStyle(inputCon[i], "color", "rgb(193,193,193)")

//           }
//         }
//       }
//       let checkInput = (i: any) => {
//         // Name
//         if (i == 0) {
//           if (inputs[0].value.match(regExp[0])) {
//             // cName.innerText = inputs[0].value;
//             this.render.setProperty(cName, 'innerText', inputs[0].value);

//             //inputCon[0].style.color = "rgb(64,146,181)";
//             this.render.setStyle(inputCon[0], "color", "rgb(64,146,181)");

//             // inputs[0].style.borderBottomColor = "rgb(64,146,181)";
//             this.render.setStyle(inputs[0], 'border-bottom-color', 'rgb(64,146,181)');

//           }
//           else if (inputs[0].value == "" || !inputs[0].value.match(regExp[0])) {
//             // cName.innerText = "";
//             this.render.setProperty(cName, 'innerText', "");

//             // inputs[0].style.borderBottomColor = "red";
//             this.render.setStyle(inputs[0], 'border-bottom-color', "red");

//           }
//         }

//         //CCard NUmber
//         if (i == 1) {
//           if (inputs[1].value == "") {
//             inputs[1].style.borderBottomColor = "red";
//             // cList.innerText = " ";
//             this.render.setProperty(cList, 'innerText', " ");

//           }
//           else {
//             let cNumber = inputs[1].value;
//             cNumber = cNumber.replace(/\s/g, "");

//             const match = cNumber.match(/.{1,4}/g);

//             if (match) {
//               cNumber = match.join(" ");
//               inputs[1].value = cNumber;
//               if (cNumber.length <= 0) {
//                 // cList.innerText = "";
//                 this.render.setProperty(cList, 'innerText', "");


//               } else if (cNumber.length > 19) {
//                 // cList.innerText = cNumber.substring(0, 20);
//                 this.render.setProperty(cList, 'innerText', cNumber.substring(0, 20));
//                 // inputs[1].style.borderBottomColor = "red";
//                 this.render.setStyle(inputs[1], 'border-bottom-color', "red");

//               } else {
//                 // cList.innerText = cNumber;
//                 this.render.setProperty(cList, 'innerText', cNumber);

//                 // inputs[1].style.borderBottomColor = "rgb(64,146,181)";
//                 this.render.setStyle(inputs[1], 'border-bottom-color', "rgb(64,146,181)");

//               }
//             } else {
//               inputs[1].style.borderBottomColor = "red";
//             }
//           }
//         }
//           else if (i == 2) {
//           let dateValue = inputs[2].value;
//             let d = dateValue.replace(/\s/g, "");
//             // Making sure it's a number
//             if (Number(dateValue)) {
//               d = dateValue.split("").map(i => parseInt(i, 10)).join("");
//             }
//             let date = new Date();
//             let twoDigitYear = parseInt(date.getFullYear().toString().substr(2), 10);
//             //the first two digit in the month field

//             if (d.length == 2) {
//               //checking for first
//               if ((d[0] === '0' && (d[1] !== '0' || d[1] <= '9')) || d[0] === '1' && (d[1] <= '2')) {
//                 this.render.setStyle(inputs[2], 'borderBottomColor', 'rgb(64,146,181)');
//                 this.render.setProperty(cYear, 'innerText', `${dateValue}/`);
//               }
//               else {
//                 inputs[2].style.borderBottomColor = "red";

//               }
//             }//End of Month

//             else if (d.length == 4) {
//               let twoDigitYearN = parseInt(d[2].toString().concat(d[3].toString()), 10);
//               if (twoDigitYearN > twoDigitYear) {
//                 let stringDigit = twoDigitYearN.toString();
//                 if (cYear instanceof HTMLElement) {
//                   this.render.setProperty(cYear, 'innerText', cYear.innerText + stringDigit);
//                 }
//                 if (cYear instanceof HTMLElement) {
//                   inputs[2].value = cYear.innerText;
//                 }

//                 this.render.setStyle(inputs[2], 'borderBottomColor', 'rgb(64,146,181)');
//               }
//               else {
//                 this.render.setStyle(inputs[2], 'borderBottomColor', 'red');
//               }
//             }
//           //END of IF for [i = 2]
//           else {
//             this.render.setProperty(cYear, 'innerText', "");

//             inputs[2].style.borderBottomColor = "red";
//           }
//       }
//         if (i == 3) {
//           let cV = inputs[i].value;
//           if (Number(cV) && cV.match(regExp[2])) {
//             inputs[i].style.borderBottomColor = "rgb(64,146,181)";
//           }
//           else {
//             inputs[3].style.borderBottomColor = "red";
//           }
//         }
//       }
//       //setting value initially in the card to that of placeholder
//       this.render.setProperty(cName, 'innerText', inputs[0].getAttribute('placeholder'));
//       this.render.setProperty(cList, 'innerText', inputs[1].getAttribute('placeholder'));
//       this.render.setProperty(cYear, 'innerText', inputs[2].getAttribute('placeholder'));

//       for (let i = 0; i < inputCon.length; i++) {
//         inputs[i].addEventListener('click', fieldColor.bind(this, i));
//         inputs[i].addEventListener('input', checkInput.bind(this, i));
//       }
//       if (btn) {
//         btn.addEventListener('click', (e) => {
//           e.preventDefault();
//           for (let i = 0; i < length; i++) {
//             if (inputs[i].value == "") {
//               inputs[i].style.borderBottomColor = "red";
//             }
//           }
//           if(cList instanceof HTMLElement){
//           if (cList.innerText.length < 16) {
//             inputs[1].style.borderBottomColor = "red";
//           }
//         }});
//       }
//     });




//   }

// }







