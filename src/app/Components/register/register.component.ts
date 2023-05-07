import { Component } from '@angular/core';
import { FormControl, FormGroup ,FormBuilder, Validators} from '@angular/forms';
import { AuthService } from 'src/app/Services/Auth_Services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
Register:FormGroup=new FormGroup({
  'firstName':new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(10)]),
  'lastName':new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(10)]),
  'phone':new FormControl('',[Validators.required]),
  'address':new FormControl('',[Validators.required,Validators.minLength(5),Validators.maxLength(100)]),
  'userName':new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(10)]),
  'email':new FormControl('',[Validators.required,Validators.email]),
  'password':new FormControl('',[Validators.required]),

})
submitRegister(){
  if(this.Register.invalid){
    return;
  }
  console.log(this.Register.value)
  this.Auth.Sinup(this.Register.value).subscribe((data)=>{
    console.log(data)

    this._Router.navigateByUrl("");
  });
  console.log(this.Register.value)
}
constructor(private Auth: AuthService, private _Router:Router){}
}
