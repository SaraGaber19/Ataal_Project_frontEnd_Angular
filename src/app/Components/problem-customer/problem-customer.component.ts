import { Component ,OnInit} from '@angular/core';
import { FormControl, FormGroup , Validators} from '@angular/forms';
import { ProblemService } from 'src/app/Services/Problem/problem.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatStepper } from '@angular/material/stepper';
import { AuthService } from 'src/app/Services/Auth_Services/auth.service';

@Component({
  selector: 'app-problem-customer',
  templateUrl: './problem-customer.component.html',
  styleUrls: ['./problem-customer.component.scss']
})
export class ProblemCustomerComponent {
  Choosed:boolean=false;
  Sections:any;
  stepOneCompleted:boolean=false;
  stepTwoCompleted :boolean=false;
  stepThreeCompleted :boolean=false;
  stepFourCompleted :boolean=false;
  KeyWords:any;
  UpdatedProblemId:any;
  updatedProblem:any;
  UpdateProbVIP:boolean=false;
  customerId:string="";
constructor(private ProblemServ:ProblemService, private _router:ActivatedRoute,private Auth:AuthService){}
ngOnInit(): void {


  this.Auth.UserId.subscribe(
    ()=>{
  if(this.Auth.UserId.getValue()!=null){
this.customerId=this.Auth.UserId.getValue();

  }})

    this.UpdatedProblemId = this._router.snapshot.paramMap.get('id')||undefined;
    console.log('ID:', this.UpdatedProblemId);
  if(this.UpdatedProblemId!=undefined){
  this.ProblemServ.getProblemById(this.UpdatedProblemId).subscribe((data)=>{console.log(data)
    this.updatedProblem=data
    this.UpdateProbVIP=data.isVIP;
    this.initializeForm()
    })
}



 this. ProblemServ.GetAllSections().subscribe((data)=>{
  this.Sections=data
 })
//  Sections
}
submiteFirstStep(){

  console.log(this.selected)
  if(this.selected==undefined){
    this.Choosed=false;
    this.stepOneCompleted = false;
  }
  else{
    this.stepOneCompleted = true;
    this.Choosed=true;
    this.ProblemServ.getKeyWordsBySectionName(+this.selected).subscribe((data)=>{
this.KeyWords=data
      console.log(data)
    })
  }
}


  imageURL1:string='';
  imageURL2:string='';
  imageURL3:string='';
  imageURL4:string='';
  selectedItem: string='';
  selected:string="";
  ProblemId:number=0;

  toggleValue:boolean=false;

VIP:boolean= false;
  data:FormData = new FormData()as FormData;
 Problem:FormGroup=new FormGroup({
    'Title':new FormControl('',[Validators.required,Validators.minLength(20),Validators.maxLength(100)]),
    'Description':new FormControl('',[Validators.required,Validators.minLength(100),Validators.maxLength(300)]),
    'KeyWord':new FormControl(null),



  })
 File:FormGroup=new FormGroup({
    'files':new FormControl()
  })


   selectItem(item:number) {

    this.Problem.controls['KeyWord'].setValue(item);
}
  submitProblem(){

    console.log( this.Problem.value)
    if(this.Problem.invalid){


 return;
    }
    else{
      this.stepTwoCompleted=true;
      if(this.Problem.value.KeyWord!=null){
    this.data.append("KyeWord_ID", this.Problem.value.KeyWord)
    }
    if(this.UpdatedProblemId==undefined){
    this.data.append("Customer_ID",this.customerId)   //

    }
    this.data.append("Title",this.Problem.value.Title)
    this.data.append("Description",this.Problem.value.Description)
    this.data.append("Section_ID",this.selected)

    }

  }
  submitFiles(){

    console.log(this.data.get('File1'));


  }

  handleData(data:boolean){
    this.VIP=data;
    console.log(data)

  }

PostProblem(){

  this.data.append("VIP", this.VIP.toString())
  this.ProblemServ.AddProblem(this.data).subscribe((data)=>{
    this.ProblemId= +(data)
   console.log(data)
  //  this._router.navigateByUrl("");
})
}

UpdateProblem(){
//   this.data.append("KyeWord_ID", this.Problem.value.KeyWord)
//   this.data.append("Title",this.Problem.value.Title)
// this.data.append("Description",this.Problem.value.Description)
// this.data.append("VIP", this.VIP.toString())
console.log(this.selected)

this.data.append("VIP", this.VIP.toString())
this.data.append("Problem_id", this.UpdatedProblemId)

//call api for update
this.ProblemServ.UpdateProblem(this.UpdatedProblemId,this.data).subscribe((data)=>{

 console.log(data)
//  this._router.navigateByUrl("");
})

}



initializeForm(): void {


if(this.updatedProblem.section_id!=undefined){
  this.ProblemServ.getKeyWordsBySectionName(+this.selected).subscribe((data)=>{
    this.KeyWords=data
          console.log(data)
        })
      }
  this.stepOneCompleted=true
  this.Choosed=true;
  this.selected=this.updatedProblem.section_id;
  //get keys
  this.Problem.controls['Title'].setValue(this.updatedProblem.title);
  this.Problem.controls['Description'].setValue(this.updatedProblem.description);
  // section_id
  // this.data.append("VIP", this.VIP.toString())
  this.Problem.controls['KeyWord'].setValue(this.updatedProblem.key_WordId);

  if(this.updatedProblem.photoPath1!=null){
  this.
  imageURL1=`https://localhost:7273/${this.updatedProblem.photoPath1}`
  }
  if(this.updatedProblem.photoPath2!=null){
    this.
    imageURL1=`https://localhost:7273/${this.updatedProblem.photoPath2}`
    }
    if(this.updatedProblem.photoPath3!=null){
      this.
      imageURL1=`https://localhost:7273/${this.updatedProblem.photoPath3}`
      }
      if(this.updatedProblem.photoPath4!=null){
        this.
        imageURL1=`https://localhost:7273/${this.updatedProblem.photoPath4}`
        }
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



  // ReturnSection(){
  //   this._router.navigateByUrl("/CustomerSections")
  // }


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

//   onSectionSelected(event:any) {
//     this.selected=event.value;
//     this.data.append("Section_ID",this.selected)
//     console.log(this.selected);
//     if(this.selected==undefined){
//       this.Choosed=false;
//     }
//     else{
//       this.stepOneCompleted = true;
//       this.Choosed=true;
//       this.ProblemServ.getKeyWordsBySectionName(+this.selected).subscribe((data)=>{
// this.KeyWords=data
//         console.log(data)
//       })
//     }
//   }

//   tagreba(){
//     console.log(this.selected)


//   }


}
