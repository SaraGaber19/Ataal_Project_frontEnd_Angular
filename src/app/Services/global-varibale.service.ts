import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalVaribaleService {

  constructor() { }

  PortNumber = 7273;

  private problemsSubject = new Subject<any[]>();

  sendProblems(problems: any[]) {
    this.problemsSubject.next(problems);
  }

  getProblems(): Observable<any[]> {
    return this.problemsSubject.asObservable();
  }
}
