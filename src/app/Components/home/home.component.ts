import { Component,OnInit } from '@angular/core';
import { SectionService } from 'src/app/Services/section.service';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent  implements OnInit{
  constructor( private sections:SectionService,private spinner:NgxSpinnerService){}
Sections:any
ngOnInit(): void {
  this.spinner.show()
  this.sections.GetAllSetions().subscribe((data)=>{
  console.log(data)
  this.Sections=data;
  this.spinner.hide()

})
}


Section:any;
sendData(id:number){
let data =this.Sections.find((one:any)=>one.id==id);
console.log(data)
this.Section=data;
}
getwords(str:string){
  let words = str.split(" "); // split the string into an array of words
  let firstTenWords = words.slice(2, 10); // extract the first 10 words
  return firstTenWords.join(" "); // join the first 10 words back into a string

  }
}
