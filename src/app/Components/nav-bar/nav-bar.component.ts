import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { NavBarService } from 'src/app/Services/Nav_Services/nav-bar.service';
import { ProblemService } from 'src/app/Services/Problem/problem.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchService } from 'src/app/Services/search.service';
import { AuthService } from 'src/app/Services/Auth_Services/auth.service';
import { TechnicalProfileServicesService } from 'src/app/Services/technical-profile-services.service';
import { SectionService } from 'src/app/Services/section.service';
import { GlobalVaribaleService } from 'src/app/Services/global-varibale.service';
import { BrowseAllJobsService } from 'src/app/Services/browse-all-jobs.service';
// import * as $ from 'jquery';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss', '../../../assets/style.css'],
})
export class NavBarComponent implements OnInit {
  notificationNumber: number = 0;
  notification: any;
  AllSection: any;
  currentData: any;
  currentOffer: any;
  Recom: boolean = false;
  query: string = '';
  added: boolean = false;
  offer: any;
  IsLogin: boolean = false;
  customerPhoto: any = null;
  customerName: string = '';
  customerId:number=0;
  IsLoginTech: boolean = false;
///////////hossam////////
Technical:any;
AllSections:any;
AllProblems:any;
selected:any;
searchText:string = '';
Techn:number=0;
Problems:any;



  ngOnInit(): void {

    this.Auth.UserId.subscribe(
      ()=>{
    if(this.Auth.UserId.getValue()!=null){
      if(this.Auth.userRole.getValue()=="Customer"){
        this.customerId=this.Auth.UserId.getValue();
      }

 else{
  this.Techn=this.Auth.UserId.getValue();
 }

    }})




    this.Auth.UserId.subscribe(() => {
      if (
        this.Auth.UserId.getValue() != null &&
        this.Auth.userRole.getValue() == 'Customer'
      ) {

        console.log(";knklasnda");
        this.customer
          .getNotificationNumber(this.Auth.UserId.getValue())
          .subscribe((data) => {

            this.notificationNumber = data;
            console.log(data)
          });

        this.Auth.photo.subscribe(() => {
          if (this.Auth.photo.getValue() != null) {
            this.customerPhoto = this.Auth.photo.getValue();
          }
        });
        this.Auth.name.subscribe(() => {
          if (this.Auth.name.getValue() != null) {
            this.customerName = this.Auth.name.getValue();
          }
        });

        console.log(this.customerName);
        console.log(this.IsLogin);
        this.IsLogin = true;
        this.IsLoginTech=false;
      } else if(
        this.Auth.UserId.getValue() != null &&
        this.Auth.userRole.getValue() == 'Technical'
      ) {
        this.IsLogin = false;
        this.IsLoginTech=true;

      }
      else{
        this.IsLogin = false;
        this.IsLoginTech=false;
      }
    });

    this.Section.GetAllSections().subscribe((data) => {
      console.log(data);
      this.AllSection = data;
    });

///////////////hossam//////////////////////////
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
  // SendId(id:number){
  //   // this._Router.navigate([`../SectionCustomer`,id])
  // //  this._Router.navigateByUrl(`/SectionCustomer/${id}`);
  // }

  getNotification() {
    this.customer.getNotification(this.customerId).subscribe((data) => {
      console.log(this.customerId)
      console.log(data);
      this.notification = data.notifications;

      this.notificationNumber = 0;
    });
  }

  AcceptOffer() {
    var data = {
      technicalId: this.offer.technicalid,
      problemId: this.offer.problemID,
      offerId: this.offer.offerId,
    };
    this.Section.AcceptOffer(data).subscribe((data) => {
      console.log(data);

      this.added = true;
    });
  }

  handleClick(i: number) {
    this.added = false;
    this.currentData = this.notification[i];
    console.log(this.currentData);
    if (this.currentData.offerId == null) {
      this.Recom = true;
    } else {
      this.Recom = false;
      this.Section.getOfferById(this.currentData.offerId).subscribe((data) => {
        console.log(data);
        this.offer = data;
      });

      //get offer by id  and display here
      // add buton to accept
      // button to close

      //acept offer will call api to send data for accept
    }
  }

  onSearch() {
    this.search.setSearchQuery(this.query);
    this._Router.navigateByUrl('/Search');
  }

  getDate(dateString: string): string {
    const NotificationDate = new Date(dateString);
    const diffMs = new Date().getTime() - NotificationDate.getTime();
    const diffMins = Math.round(diffMs / 60000); // convert to minutes
    if (diffMins < 60) {
      return `${diffMins} minute${diffMins === 1 ? '' : 's'} ago`;
    } else if (diffMins < 1440) {
      const diffHours = Math.floor(diffMins / 60);
      return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
    } else {
      const diffDays = Math.floor(diffMins / 1440);
      return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
    }
  }

  constructor(
    private customer: NavBarService,
    private Section: ProblemService,
    private _Router: Router,
    private search: SearchService,
    private Auth: AuthService,

    private myservice: TechnicalProfileServicesService, private myroute:ActivatedRoute
    , private sectionservice: SectionService,
     private searchService: SearchService,private globalVar:GlobalVaribaleService,
     private browseAllJobsService: BrowseAllJobsService
  ) {}




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
  }

  // getTime(date:any){
  //   const Datee = new Date(date);
  //  return `${Datee.getHours()}:${Datee.getMinutes()}:${Datee.getSeconds()} ${Datee.getHours() >= 12 ? 'PM' : 'AM'}`
  //   // this.realyTime=Datee.getTime()

  // }
}
