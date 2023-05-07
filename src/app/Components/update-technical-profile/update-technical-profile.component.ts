import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SectionService } from 'src/app/Services/section.service';
import { TechnicalProfileServicesService } from 'src/app/Services/technical-profile-services.service';
import {
  FormGroup,
  FormControl,
  Validators,
  EmailValidator,
} from '@angular/forms';
import { AuthService } from 'src/app/Services/Auth_Services/auth.service';

@Component({
  selector: 'app-update-technical-profile',
  templateUrl: './update-technical-profile.component.html',
  styleUrls: ['./update-technical-profile.component.scss'],
})
export class UpdateTechnicalProfileComponent {
  constructor(
    private myservice: TechnicalProfileServicesService,
    private myroute: ActivatedRoute,
    private sectionService: SectionService,
    private Auth: AuthService
  ) {}

  selectedSectionId: number = 1;
  Technical: any;
  firstName: any;
  lastName: any;
  Stars: any = [];
  RemainingStars: any = [];
  AllSectionsInDb: any;
  selectedSection: any;
  TechId: number = 0;
  //   // myForm:any;
  data: FormData = new FormData() as FormData;

  myForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [
      Validators.minLength(2),
      Validators.maxLength(20),
    ]),
    lastName: new FormControl('', [
      Validators.minLength(2),
      Validators.maxLength(10),
    ]),
    phone: new FormControl('', [Validators.pattern('^01(0|1|2|5)[0-9]{8}$')]),
    address: new FormControl('', [
      Validators.minLength(3),
      Validators.maxLength(100),
    ]),
    email: new FormControl('', [Validators.email]),
  });

  ngOnInit(): void {
    this.Auth.UserId.subscribe(() => {
      if (this.Auth.UserId.getValue() != null) {
        this.TechId = this.Auth.UserId.getValue();
        //Inject Service
        this.myservice.getTechnicalByID(this.TechId).subscribe({
          next: (data) => {
            this.Technical = data;
            this.firstName = this.Technical.name.split(' ')[0];
            this.lastName = this.Technical.name.split(' ')[1];
            console.log('data to update');
            console.log(data);
            this.initializateForm();
          },
          error: (err) => {
            console.log(err);
          },
        });

        this.sectionService.GetAllSetionsNamesAndId().subscribe({
          next: (data) => {
            this.AllSectionsInDb = data;
            this.initializateForm();
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    });

    console.log('intialize form');
  }

  // logValue() {
  //   console.log(this.myForm.controls.firstName.value);
  // }

  removeSection(section: any) {
    console.log('inside remove section');

    console.log(this.Technical.sections.indexOf(section));
    const index = this.Technical.sections.indexOf(section);

    if (index !== -1) {
      this.Technical.sections.splice(index, 1);
    }
  }

  initializateForm(): void {
    this.myForm.controls['firstName'].setValue(this.firstName);
    this.myForm.controls['lastName'].setValue(this.lastName);
    this.myForm.controls['phone'].setValue(this.Technical.phone);
    this.myForm.controls['address'].setValue(this.Technical.address);
    this.myForm.controls['email'].setValue(this.Technical.eamil);
  }

  //When section changed
  sectionName: any;
  onSectionSelection(event: any) {
    let index = event.options.selectedIndex;
    if (index != -1) {
      this.sectionName = event.options[index].value;
      const allSectionsDisplayDiv = document.querySelector(
        '.allSectionsDisplay'
      );
      console.log(allSectionsDisplayDiv);
      if (allSectionsDisplayDiv) {
        const newDiv = document.createElement('div');
        newDiv.classList.add('m-1');
        newDiv.style.textAlign = 'center';
        newDiv.style.width = 'auto';
        newDiv.style.paddingLeft = '0.5rem';
        newDiv.style.paddingRight = '0.5rem';
        newDiv.style.backgroundColor = 'lightgrey';
        newDiv.style.borderRadius = '1rem';
        newDiv.innerHTML = this.sectionName;
        const button = document.createElement('button');
        button.style.backgroundColor = 'transparent';
        button.style.border = '0';
        button.addEventListener('click', () => {
          this.removeSection(this.sectionName);
        });

        const svg = document.createElementNS(
          'http://www.w3.org/2000/svg',
          'svg'
        );
        svg.setAttribute('width', '16');
        svg.setAttribute('height', '16');
        svg.setAttribute('fill', 'currentColor');
        svg.classList.add('bi', 'bi-x');
        svg.setAttribute('viewBox', '0 0 16 16');

        const path = document.createElementNS(
          'http://www.w3.org/2000/svg',
          'path'
        );
        path.setAttribute(
          'd',
          'M4.646 4.646a.5.5.0 0 1 .708 0L8 7.293l2.646-2.647a.5.5.0 0 1 .708.708L8.707 8l2.647 2.646a.5.5.0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5.0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5.0 0 1 0-.708z'
        );

        svg.appendChild(path);
        button.appendChild(svg);
        newDiv.appendChild(button);
        allSectionsDisplayDiv.appendChild(newDiv);
      }
    }
  }

  //Handle Image Preview
  base64String: string = '';
  onFileSelected(event: any) {
    const selectedFile = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onload = () => {
      this.base64String = reader.result!.toString().split(',')[1] ?? '';
      console.log(this.base64String);
    };
  }

  UpdateBtn() {
    const UpdatedTechnical = {
      id: this.TechId,
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      address: '',
      userName: '',
      photo: '',
      breif: '',
    };
    UpdatedTechnical.firstName = (<HTMLInputElement>(
      document.getElementById('firstName')
    )).value;
    UpdatedTechnical.lastName = (<HTMLInputElement>(
      document.getElementById('lastName')
    )).value;
    UpdatedTechnical.phone = (<HTMLInputElement>(
      document.getElementById('phone')
    )).value;
    UpdatedTechnical.email = (<HTMLInputElement>(
      document.getElementById('email')
    )).value;
    UpdatedTechnical.address = (<HTMLInputElement>(
      document.getElementById('address')
    )).value;
    UpdatedTechnical.breif = (<HTMLTextAreaElement>(
      document.getElementById('brief')
    )).value;
    UpdatedTechnical.photo = this.base64String;

    console.log(UpdatedTechnical);
    this.Technical.name = document.getElementById('firstName');
    this.myservice.updateTechnicalProfile(UpdatedTechnical).subscribe(
      (response) => {
        console.log('Update successful');
        console.log(response);
      },
      (error) => {
        console.log('Update failed');
        console.log(error);
      }
    );
  }
}
