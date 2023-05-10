import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { GlobalVaribaleService } from './global-varibale.service';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private myClient:HttpClient, private globalVar: GlobalVaribaleService) { }

  URL = "http://ataal.somee.com/api/Report";

  reportReview(reviewId: number, technicalId: number, cause: string, description: string): Observable<any> {
      const body = { review_ID: reviewId, technicalid: technicalId, cause: cause, description: description, created_Date: new Date() };
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
      return this.myClient.post<any>(this.URL, body, httpOptions);
    }
  }


