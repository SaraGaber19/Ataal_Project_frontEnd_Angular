import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterInt } from 'src/app/Interfaces/register-int';
import { Observable, BehaviorSubject } from 'rxjs';
import { LoginInt } from 'src/app/Interfaces/login-int';
import jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any = new BehaviorSubject(null);
  UserId: any = new BehaviorSubject(null);
  userRole: any = new BehaviorSubject(null);
  name: any = new BehaviorSubject(null);
  photo: any = new BehaviorSubject(null);
  constructor(private http: HttpClient, private _Router: Router) {
    if (localStorage.getItem('userToken') != null) {
      this.getuserData();
      console.log('fff');
    }
  }

  async getuserData() {
    let encodedUser = JSON.stringify(localStorage.getItem('userToken'));
    let decodeduser: any = jwtDecode(encodedUser);
    console.log(decodeduser);
    this.userData.next(decodeduser);
    this.userRole.next(
      this.userData.getValue()[
        'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
      ]
    );
    console.log(this.userRole.getValue())

if(this.userRole.getValue()=="Customer"){
  await this.gitCustomerByAppUser(
    this.userData.getValue()[
      'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
    ]
  ).subscribe((data) => {
    this.UserId.next(data.id);
    console.log(decodeduser);
    this.name.next(data.name);
    this.photo.next(data.photo);
    console.log(this.name.getValue());
  });
}
else{
  await this. getTechByAppUser(
    this.userData.getValue()[
      'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
    ]
  ).subscribe((data) => {
    this.UserId.next(data.id);
    console.log(decodeduser);
    this.name.next(data.name);
    this.photo.next(data.photo);
    console.log(this.name.getValue());
  });
}



  }

  gitCustomerByAppUser(id: string): Observable<any> {
    return this.http.get(`https://localhost:7273/appuser/${id}`);
  }


  getTechByAppUser(id:string): Observable<any> {
    return this.http.get(`https://localhost:7273/Techappuser/${id}`);
  }


  Sinup(RegisterData: RegisterInt): Observable<any> {
    return this.http.post(
      'https://localhost:7273/api/Identity/CustomerRegister',
      RegisterData
    );
  }
  SinIn(LoginData: LoginInt): Observable<any> {
    return this.http.post(
      'https://localhost:7273/api/Identity/Login',
      LoginData
    );
  }

  SinupTechnicacan(RegisterData: RegisterInt): Observable<any> {
    return this.http.post(
      'https://localhost:7273/api/Identity/TechnicalRegister',
      RegisterData
    );
  }

  sinout() {
    localStorage.removeItem('userToken');
    this.userData.next(null);
    this.UserId.next(null);
    this.userRole.next(null);
    this.name.next(null);
    this.photo.next(null);
    this._Router.navigateByUrl('/Login');
  }
}
