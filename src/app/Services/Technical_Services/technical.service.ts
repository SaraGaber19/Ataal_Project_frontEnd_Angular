import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
//  import { Technican } from '../../../Models/technican';
import { HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class TechnicalService {
  constructor(private http:HttpClient) { }
  // private technicians: Technican[] = [
  //   {
  //     name: 'John Doe',
  //     photo: 'https://example.com/john-doe.jpg',
  //     phone: '555-1234',
  //     brief: 'John is an experienced technician with over 10 years of experience.'
  //   },
  //   {
  //     name: 'Jane Smith',
  //     photo: 'https://example.com/jane-smith.jpg',
  //     phone: '555-5678',
  //     brief: 'Jane is a skilled technician specializing in electrical systems.'
  //   },
  //   // Add more technicians here
  // ];

  // getTechnicians(): Observable<Technican[]> {
  //   return of(this.technicians);
  // }
getAllTechnicals(id:number):Observable<any>{

    return this.http.get(`https://localhost:7273/api/Customer/GetAllTechnicansCustomerNeed/${id}`)
  }


}

