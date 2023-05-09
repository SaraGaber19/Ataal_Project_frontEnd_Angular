import { Component ,OnInit} from '@angular/core';
import { SearchService } from 'src/app/Services/search.service';
import { TechnicalService } from 'src/app/Services/Technical_Services/technical.service';
import { Technican } from 'src/app/Interfaces/technican';
import { ProblemService } from 'src/app/Services/Problem/problem.service';
import { AuthService } from 'src/app/Services/Auth_Services/auth.service';

@Component({
  selector: 'app-search-tchn',
  templateUrl: './search-tchn.component.html',
  styleUrls: ['./search-tchn.component.scss']
})
export class SearchTchnComponent implements OnInit {
  SearchKey:string="";
  AllTechnicans:Technican[]=[];
  SearchResult:Technican[]=[];
  FilterResult:Technican[]=[];
  FinalResult:Technican[]=[];
  TOP_RATED_PLUS_Var:boolean=false
  TOP_RATED_Var:boolean=false
  Other_Var:boolean=false
   AllSection:any
   filteration:Boolean=false;
   AllFilterSections:number[]=[]
   customerId:number=0;
  ngOnInit(): void {
    this.Auth.UserId.subscribe(
      ()=>{
    if(this.Auth.UserId.getValue()!=null){
  this.customerId=this.Auth.UserId.getValue();

    }})
    this.Section.GetAllSections().subscribe((data)=>{console.log(data)
      this.AllSection=data;
      })

    this.technicans.getAllTechnicals(this.customerId).subscribe((data)=>{console.log(data)
      this.AllTechnicans=data;
      })
    this.search.searchQuery$.subscribe((data)=>{console.log(data)
      const checkboxes = document.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach((checkbox: Element) => {
        (checkbox as HTMLInputElement).checked = false;
      });
      this.SearchKey=data;
      console.log("sub")
      this.SearchResult=[]
      this. FilterResult=[]

//this.SearchResult= this.AllTechnicans.filter((tech:Technican)=>{tech.name.toLowerCase().includes(this.SearchKey.toLowerCase())})
this.AllTechnicans.map((tech)=>tech.name.includes(this.SearchKey)?this.SearchResult.push(tech):"")
this.FilterResult=this.SearchResult
this.FinalResult=this.SearchResult;
 console.log(this.FilterResult)
    })

  }
constructor(private search:SearchService,private technicans:TechnicalService,private Section:ProblemService ,private Auth:AuthService){}

TOP_RATED_PLUS(){
if(  this.TOP_RATED_PLUS_Var==false){
  this.TOP_RATED_PLUS_Var=true

this.function();

}
else{
  this.TOP_RATED_PLUS_Var=false
  this.function();
}
}
TOP_RATED(){
  if(  this.TOP_RATED_Var==false){
    this.TOP_RATED_Var=true

  this.function();

  }
  else{
    this.TOP_RATED_Var=false
    this.function();
  }
}
Other(){
  if(  this.Other_Var==false){
    this.Other_Var=true

  this.function();

  }
  else{
    this.Other_Var=false
    this.function();
  }
}
SectionFilter(id:number){

  let index = this.AllFilterSections.indexOf(id);
if (index !== -1) {
  this.AllFilterSections.splice(index, 1);
}
 else{
  this.AllFilterSections.push(id);
 }
 this.function ()
}




function (){
  this.FilterResult=[];
  if( this.TOP_RATED_PLUS_Var==true){
    this.SearchResult.map((tech)=>tech.rate==5?this.FilterResult.push(tech):"")
  }
if(this. TOP_RATED_Var==true){
  this.SearchResult.map((tech)=>tech.rate==4?this.FilterResult.push(tech):"")
}
if(this.Other_Var==true){
  this.SearchResult.map((tech)=>tech.rate<4?this.FilterResult.push(tech):"")
}

if(this.Other_Var==false&&this. TOP_RATED_Var==false&& this.TOP_RATED_PLUS_Var==false){
  this.FilterResult=this.SearchResult

}
this.sectionFilter();
}

sectionFilter(){
  if(this.AllFilterSections.length>0){
    this.FinalResult=[];
    this.FilterResult.forEach((tech) => {
      if (tech.sections && tech.sections.some((section) => this.AllFilterSections.includes(section.id))) {
        this.FinalResult.push(tech);
      }
    });
    // this.SearchResult.map((tech)=>this.AllFilterSections.includes(tech.sections?.id)?this.FilterResult.push(tech):"")
  }
  else{
    this.FinalResult=this.FilterResult;
  }
}
BlockedDone:boolean=false;
BlockedId:number=0;
sendId(id:number){
this.BlockedId=id;
}


blockTech(){

const data= {
  customerId:  this.customerId,
  technicalId: this.BlockedId
}
this.search.BlockTech(data).subscribe((data)=>{
  console.log(data)
  if(data!=null){
    this.BlockedDone=true;
  }
})
}


}
