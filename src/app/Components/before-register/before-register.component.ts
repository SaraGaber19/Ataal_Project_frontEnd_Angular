import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-before-register',
  templateUrl: './before-register.component.html',
  styleUrls: ['./before-register.component.scss']
})
export class BeforeRegisterComponent {
  constructor(private _router:Router){}
  cust:boolean=false;
  Tech:boolean=false;
 value(val:number){
  if(val==1){
    if(this.cust==false){
      this.Tech=false;
      this.cust=true;
    }
    else{
      this.Tech=false;
      this.cust=false;
    }

  }
  else{
    if(this.Tech==false){
      this.Tech=true;
      this.cust=false;
    }
    else{
      this.Tech=false;
      this.cust=false;
    }
  }

 }

 navigate(){
  if(this.cust==true){
    this._router.navigateByUrl("/Register")
  }
  else if(this.Tech==true){
    this._router.navigateByUrl("/RegisterTech")
  }
 }
}
