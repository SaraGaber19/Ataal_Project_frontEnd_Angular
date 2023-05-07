import { Component, OnInit } from '@angular/core';
import { AuthService } from './Services/Auth_Services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Ataal_Project';
  Role:string="";
  constructor(private Auth:AuthService){}
ngOnInit(): void {
  this.Auth.UserId.subscribe(
    ()=>{
  if(this.Auth.userRole.getValue()!=null){
this.Role=this.Auth.userRole.getValue()
console.log("saarrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrraaaaaaaaaaaaaaaaaaaaaaaa")
console.log(this.Role)
  }})
}


}
