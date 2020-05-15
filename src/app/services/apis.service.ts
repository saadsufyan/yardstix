import { Injectable, Component } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { NetworkService } from './network.service';

let temp;

@Injectable({
  providedIn: 'root'
})
export class ApisService {

  constructor(private http: HttpClient, public network: NetworkService) { }

  getQuestion(uniqueLink): Observable<any> {
    return this.http
    .get(`${environment.baseUrl}/users/questions?link=${uniqueLink}`, {headers: this.network.getHeaders()})
    .pipe(catchError((error: any) => {
        return throwError(error);
    }));
  }
  giveFeedback(payload): Observable<any> {
    return this.http
    .post(`${environment.baseUrl}/users/add_feedback`, payload, {headers: this.network.getHeaders()})
    .pipe(catchError((error: any) => {
        return throwError(error);
    }));
  }
  getResultsChart(uniqueLink): Observable<any> {
    return this.http
    .get(`${environment.baseUrl}/users/response_data?link=${uniqueLink}`, {headers: this.network.getHeaders()})
    .pipe(catchError((error: any) => {
        return throwError(error);
    }));
  }
  feedbackRequest(payload): Observable<any> {
    return this.http
    .post(`${environment.baseUrl}/users/send_feedback_request`, payload, {headers: this.network.getHeaders()})
    .pipe(catchError((error: any) => {
        return throwError(error);
    }));
  }
  login(payload): Observable<any> {
    return this.http
    .post(`${environment.baseUrl}/users/login`, payload, {headers: this.network.getHeaders()})
    .pipe(catchError((error: any) => {
        return throwError(error);
    }));
  }
  register(payload): Observable<any> {
    return this.http
    .post(`${environment.baseUrl}/users/register`, payload, {headers: this.network.getHeaders()})
    .pipe(catchError((error: any) => {
        return throwError(error);
    }));
  }
  send(data) {
    temp = data;
}
fetchData() {
    return temp;
}
}
