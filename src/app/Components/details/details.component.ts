import { Component,OnInit } from '@angular/core';
import { ProblemService } from 'src/app/Services//Problem/problem.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit  {
  myParameter:any;
  Problem:any
constructor(private problem:ProblemService,private route: ActivatedRoute){

}
ngOnInit(): void {


  this.myParameter= this.route.snapshot.paramMap.get('id')
  console.log(this.myParameter)

  this.problem.getProblemById(this.myParameter).subscribe((data)=>{console.log(data)
  this.Problem=data
  })


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



}
