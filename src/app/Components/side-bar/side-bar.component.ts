import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/Services/Auth_Services/auth.service';
import { DetailedProlemService } from 'src/app/Services/detailed-prolem.service';
import { GlobalVaribaleService } from 'src/app/Services/global-varibale.service';
import { SideBarService } from 'src/app/Services/side-bar.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

    constructor(private myservice: SideBarService, private myroute:ActivatedRoute, private myServiceDetalied:DetailedProlemService, private globalVar:GlobalVaribaleService,private Auth:AuthService ){}

    Technical:any;
    Points:any = 0;
    Stars:any = [];
    RemainingStars:any = [];
    portNumber = this.globalVar.PortNumber;
    Techn:number=0;
  ngOnInit(): void {
    this.Auth.UserId.subscribe(            //not work
      ()=>{
    if(this.Auth.UserId.getValue()!=null){
  this.Techn=this.Auth.UserId.getValue();

  this.myservice.getUserByID(this.Techn).subscribe(
    {
      next: (data)=>{


        this.myServiceDetalied.getPoints(this.Techn).subscribe(
          {
            next: (data)=>{
              this.Points = data;
            },
            error: (err)=>{ console.log(err)}
          });

        console.log(data)
        console.log(this.Techn)
        console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhoooooosssssssssssssssssssssssssssss")
        this.Technical = data;

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
      error: (err)=>{ console.log(err)
        console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhoooooosssssssssssssssssssssssssssss")
        console.log(this.Techn)
      }
    });

    }})


      //!Edit

  }

}
