import { Component ,OnInit} from '@angular/core';
import { FormControl, FormGroup , Validators} from '@angular/forms';

import { Router } from '@angular/router';
import { MatStepper } from '@angular/material/stepper';
import { ProblemService } from 'src/app/Services/Problem/problem.service';




// export interface ChipColor {
//   name: string;
//   color: ThemePalette;
// }
// export interface Data {
//   name:any;
//   co: any;
//   color: any;

// }

@Component({
  selector: 'app-customer-problem',
  templateUrl: './customer-problem.component.html',
  styleUrls: ['./customer-problem.component.scss'],

})
export class CustomerProblemComponent implements OnInit {

  Choosed:boolean=false;
  Sections:any;
  stepOneCompleted:boolean=false;
  stepTwoCompleted :boolean=false;
  stepThreeCompleted :boolean=false;
  stepFourCompleted :boolean=false;

constructor(private ProblemServ:ProblemService, private _router:Router){}
ngOnInit(): void {
 this. ProblemServ.GetAllSections().subscribe((data)=>{
  this.Sections=data
 })
//  Sections
}



  imageURL1:string='';
  imageURL2:string='';
  imageURL3:string='';
  imageURL4:string='';
  selectedItem: string='';
  selected:string="";
  ProblemId:number=0;

  toggleValue:boolean=false;
  data:FormData = new FormData()as FormData;
 Problem:FormGroup=new FormGroup({
    'Title':new FormControl('',[Validators.required,Validators.minLength(20),Validators.maxLength(100)]),
    'Description':new FormControl('',[Validators.required,Validators.minLength(100),Validators.maxLength(300)]),
    'KeyWord':new FormControl(``),



  })
 File:FormGroup=new FormGroup({
    'files':new FormControl()
  })


   selectItem(item: string) {

  this.Problem.get('KeyWord')!.setValue(item);
}
  submitProblem(){

    console.log( this.Problem.value)
    if(this.Problem.invalid){


 return;
    }
    else{
      this.stepTwoCompleted=true;
    this.data.append("KyeWord_ID","1")
    this.data.append("Customer_ID","1")
    this.data.append("Title",this.Problem.value.Title)
    this.data.append("Description",this.Problem.value.Description)
    }

  }
  submitFiles(){

    console.log(this.data.get('File1'));
    this.ProblemServ.AddProblem(this.data).subscribe((data)=>{
         this.ProblemId= +(data)
        console.log(data)
    })

  }

  showPreview(event: any) {
    const fileInput = event.target as HTMLInputElement;
    const files = fileInput.files;
    for (let i = 0; i < files!.length; i++) {
      this.data.append(`File${i+1}`,files![i]);
    }
    for (let i = 0; i < files!.length; i++) {
      const file = files![i];
      if (file && file instanceof Blob) {
        const reader = new FileReader();
        reader.onload = () => {
          // Set the preview image URL for the current file
          switch (i) {
            case 0:
              this.imageURL1 = reader.result as string;
              break;
            case 1:
              this.imageURL2 = reader.result as string;
              break;
            case 2:
              this.imageURL3 = reader.result as string;
              break;
            case 3:
              this.imageURL4 = reader.result as string;
              break;
            default:
              break;
          }
        };
        reader.readAsDataURL(file);
      }
    }
  }



  ReturnSection(){
    this._router.navigateByUrl("/CustomerSections")
  }


  // submitRegister(){
  //   if(this.Register.invalid){
  //     return;
  //   }
  //   this.data.name=this.Register.value.firstName
  //   this.data.color=this.Register.value.lastName
  //   const file = this.Register.controls['file'].value;
  //   this.file=this.file.concat(this.Register.controls['file'].value)
  //   console.log(this.data)
  //   console.log(file );
  // }

  // availableColors: ChipColor[] = [
  //   {name: 'none', color: undefined},
  //   {name: 'Primary', color: 'primary'},
  //   {name: 'Accent', color: 'accent'},
  //   {name: 'Warn', color: 'warn'},
  // ];

  onSectionSelected(event:any) {
    this.selected=event.value;
    this.data.append("Section_ID",this.selected)
    console.log(this.selected);
    if(this.selected==undefined){
      this.Choosed=false;
    }
    else{
      this.stepOneCompleted = true;
      this.Choosed=true;
      this.ProblemServ.getKeyWordsBySectionName(+this.selected).subscribe((data)=>{

        console.log(data)
      })
    }
  }

  onStepComplete(stepNumber: number) {
    switch (stepNumber) {
      case 1:
        this.stepOneCompleted = true;
        break;
      case 2:
        this.stepTwoCompleted = true;
        break;
      case 3:
        this.stepThreeCompleted = true;
        break;
        case 3:
          this.stepFourCompleted = true;
          break;
      default:
        break;
    }
  }


}


