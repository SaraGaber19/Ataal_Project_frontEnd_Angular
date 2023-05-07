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




}
