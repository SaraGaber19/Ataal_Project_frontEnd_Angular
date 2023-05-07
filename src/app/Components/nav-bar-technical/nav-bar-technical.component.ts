
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/Services/Auth_Services/auth.service';
import { BrowseAllJobsService } from 'src/app/Services/browse-all-jobs.service';
import { GlobalVaribaleService } from 'src/app/Services/global-varibale.service';
import { SearchService } from 'src/app/Services/search.service';
import { SectionService } from 'src/app/Services/section.service';
import { TechnicalProfileServicesService } from 'src/app/Services/technical-profile-services.service';


@Component({
  selector: 'app-nav-bar-technical',
  templateUrl: './nav-bar-technical.component.html',
  styleUrls: ['./nav-bar-technical.component.scss']
})
export class NavBarTechnicalComponent  implements OnInit{


  constructor(private myservice: TechnicalProfileServicesService, private myroute:ActivatedRoute
    , private sectionservice: SectionService,private Auth:AuthService,
     private searchService: SearchService,private globalVar:GlobalVaribaleService,
     private browseAllJobsService: BrowseAllJobsService){}

  Technical:any;
  AllSections:any;
  AllProblems:any;
  selected:any;
  searchText:string = '';
  Techn:number=0;



  ngOnInit(): void {
      this.Auth.UserId.subscribe(
    ()=>{
  if(this.Auth.UserId.getValue()!=null){
this.Techn=this.Auth.UserId.getValue();

  }})

    console.log("this.searchText");
    console.log(this.searchText);

  this.myservice.getTechnicalByID(this.Techn).subscribe(
    {
      next: (data)=>{
        this.Technical = data;

    }
  });

  this.sectionservice.GetAllSetionsNamesAndId().subscribe(
    {
      next: (data)=>{
        this.AllSections = data;
        console.log(data)

    },
    error: (err) =>{console.log(err)}
  });
}

Problems:any;

FilterProblemsBySection(sectionId:number){
  this.browseAllJobsService.GetAllProblemsInfoBySectionId(sectionId,this.Techn).subscribe(
    {

       next: (data:any)=>{



         this.globalVar.getProblems().subscribe(
           {
             next:(FilterdProblems) =>{
               this.Problems = FilterdProblems
               console.log(FilterdProblems);


              }
            }

            );
            this.globalVar.sendProblems(data);

       },
      error: (err)=>{ console.log(err)}

    });
}

TechnicalId:any;
onSearchEnterClick(event:any){
      this.myroute.params.subscribe(params => {
      this.TechnicalId= this.Techn;
    });

    this.searchService.GetResultOfSearch(event.target.value, this.TechnicalId).subscribe(
      {
        next: (data:any)=>{
          //this.globalVar.AllProblemsFromService = data;
          //this.AllProblems = data;
          this.globalVar.getProblems().subscribe(
            {
                next:(FilterdProblems) =>{
                   this.Problems = FilterdProblems

                }
            }

            );
          this.globalVar.sendProblems(data);
          console.log("search service");
          console.log(data);

      },
      error: (err) =>{console.log(err)}
    });


}

toggleDropdown() {
  const dropdown = document.getElementById("myDropdown") as HTMLElement;
  dropdown.classList.toggle("hidden");
}

logout() {
  this.Auth.sinout();
  this.Auth.userRole.next(null);
}

}
