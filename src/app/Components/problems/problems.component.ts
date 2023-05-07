import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BrowseAllJobsService } from 'src/app/Services/browse-all-jobs.service';
import * as moment from 'moment';
import { GlobalVaribaleService } from 'src/app/Services/global-varibale.service';


@Component({
  selector: 'app-problems',
  templateUrl: './problems.component.html',
  styleUrls: ['./problems.component.scss']
})
export class ProblemsComponent {

  constructor(private myservice: BrowseAllJobsService, private myroute:ActivatedRoute,
    private globalVar:GlobalVaribaleService){}


  problems:any;
  sectionId:any;

  formatDateTime(dateTime: Date): string {
    return moment(dateTime).format('YYYY-MM-DD  HH:mm:ss');
  }

  ngOnInit(): void {

    this.globalVar.getProblems().subscribe(
      {
          next:(FilterdProblems) =>{
             this.problems = FilterdProblems

          }
      }

      );
    this.GetProblems();
    console.log("on init for problems");
  }

  GetProblems(){

    // this.myroute.params.subscribe(params => {
    //   this.sectionId= params['id'];
    //   console.log("section id");
    //   console.log(this.sectionId);
    // });
    this.myservice.GetAllProblemsInfo(this.myroute.snapshot.params["technicalId"]).subscribe(
      {

         next: (data)=>{


          this.problems = data;

          this.globalVar.getProblems().subscribe(
            {
                next:(FilterdProblems) =>{
                   this.problems = FilterdProblems

                }
            }

            );
          this.globalVar.sendProblems(this.problems);



          // this.globalVar.AllProblemsFromService = data;
          // this.problems = this.globalVar.AllProblemsFromService;
          //  this.globalService.AllProblems = data;
          //  this.problems=this.globalService.AllProblems;


           console.log("date")
           console.log(this.problems[0].id)

          console.log(this.formatDateTime(this.problems.date))
         },
        error: (err)=>{ console.log(err)}

      });

  }

}
