import { Component ,OnInit} from '@angular/core';
import { FormControl, FormGroup ,FormBuilder, Validators} from '@angular/forms';
import { AuthService } from 'src/app/Services/Auth_Services/auth.service';
import { Router } from '@angular/router';
import { MatStepper } from '@angular/material/stepper';
import { SectionService } from 'src/app/Services/section.service';
import { MatSelectionListChange } from '@angular/material/list';



@Component({
  selector: 'app-register-tech',
  templateUrl: './register-tech.component.html',
  styleUrls: ['./register-tech.component.scss']
})
export class RegisterTechComponent implements OnInit{
  Sections:any
  TechId:any
  SectionsChooesed:[]=[];
  stepOneCompleted:boolean=false;
  RealId:number=0;
  ngOnInit(): void {
    this.sections.GetAllSetions().subscribe((data)=>{
      console.log(data)
      this.Sections=data;


    })
  }
  onSectionSelected(event:any) {

    this.SectionsChooesed=event.value;

    console.log(event.value);
    // this.getTech(this.TechId)


  }



  submitSection(){
       this.getTech(this.TechId)
     const  data={
      technicanId:this.RealId,
        sectionIds:this.SectionsChooesed
       }

this.Auth.AssignSections(data).subscribe((data)=>{
  console.log(data)
  if(data==true){

    this._Router.navigateByUrl("/Login");
  }
})

  }
  Register:FormGroup=new FormGroup({
    'firstName':new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(10)]),
    'lastName':new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(10)]),
    'phone':new FormControl('',[Validators.required]),
    'address':new FormControl('',[Validators.required,Validators.minLength(5),Validators.maxLength(100)]),
    'userName':new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(10)]),
    'email':new FormControl('',[Validators.required,Validators.email]),
    'password':new FormControl('',[Validators.required]),

  })
  succ:boolean=false;
  err:any
  submitRegister(){
    if(this.Register.invalid){
      return;
    }
    console.log(this.Register.value)
    this.Auth.SinupTechnicacan(this.Register.value).subscribe((data)=>{
      console.log(data)

      this.stepOneCompleted=true;
      console.log(this.stepOneCompleted)
this.succ=true
this.err=null;
this.TechId=data.appUserId


    },(erro)=>{
      this.succ=false
      console.log(erro.error[0].description)
      this.err=erro.error[0].description;
    } );

    console.log(this.Register.value)
  }



  getTech(id:string){
    this.Auth.getTechByAppUser(id).subscribe((data)=>{
this.RealId=data.id;
    console.log(data)}
    )
  }
  constructor(private Auth: AuthService, private _Router:Router, private sections:SectionService){}
}
