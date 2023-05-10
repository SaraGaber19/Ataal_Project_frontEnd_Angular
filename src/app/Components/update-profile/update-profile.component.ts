import { Component,OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/Auth_Services/auth.service';
import { CustomerService } from 'src/app/Services/Customer_Servides/customer.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit {
  customer:any
  imageURL:any='http://ataal.somee.com/avater.jpg';
  customerId:number=0;
  data:FormData = new FormData()as FormData;
 Register:FormGroup=new FormGroup({
  'firstName':new FormControl("",[Validators.required,Validators.minLength(3),Validators.maxLength(10)]),
  'lastName':new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(10)]),
  'phone':new FormControl('',[Validators.required]),
  'Address':new FormControl('',[Validators.required,Validators.minLength(5),Validators.maxLength(100)]),
  'userName':new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(10)]),
  'Email':new FormControl('',[Validators.required,Validators.email]),


});
  ngOnInit(): void {

    this.Auth.UserId.subscribe(
      ()=>{
    if(this.Auth.UserId.getValue()!=null){
  this.customerId=this.Auth.UserId.getValue();

    }})
  this.Customer.getCustomerById( this.customerId).subscribe((data)=>{console.log(data)
    this.customer=data
    this.initializeForm()
  }
  )



  }

  initializeForm(): void {

    this.Register.controls['firstName'].setValue(this.customer.firstName);
    this.Register.controls['lastName'].setValue(this.customer. lastName);
    this.Register.controls['phone'].setValue(this.customer.phone);
    this.Register.controls['Address'].setValue(this.customer.address);
    this.Register.controls['userName'].setValue(this.customer.userName);
    this.Register.controls['Email'].setValue(this.customer.email);

    if(this.customer.photo!=null){
    this.imageURL=`http://ataal.somee.com/${this.customer.photo}`
    }
  }

  showPreview(event: any) {
    const fileInput = event.target as HTMLInputElement;
    const files = fileInput.files;
    // for (let i = 0; i < files!.length; i++) {
  this.data.append(`PhotoFile`,files![0]);

    // }

      const file = files![0];
      if (file && file instanceof Blob) {
        const reader = new FileReader();
        reader.onload = () => {
          // Set the preview image URL for the current file

              this.imageURL = reader.result as string;

          }

        reader.readAsDataURL(file);
      }
              console.log(this.imageURL);
    }


    submitRegister(){
      if(this.Register.invalid){
        return;
      }
      // string FirstName,
      // string LastName,
      // string Address,
      // string Email,
      // string phone,
      // IFormFile PhotoFile);

      this.data.append("FirstName",this.Register.value.firstName)
      this.data.append("LastName",this.Register.value.lastName )
      this.data.append("Address",this.Register.value. Address)
      this.data.append("Email",this.Register.value.Email )
      this.data.append("phone",this.Register.value.phone )
      this.data.append("userName",this.Register.value.userName)

      this.Customer.UpdateProfile(this.customerId,this.data).subscribe((data)=>{
          console.log(data)
})
      // this.Auth.Sinup(this,.Register.value).subscribe((data)=>{
      //   console.log(data)

        // this._Router.navigateByUrl("");
    //   });
    //   console.log(this.Register.value)
   }
    constructor(private Auth: AuthService, private _Router:Router,private Customer:CustomerService){}
}
