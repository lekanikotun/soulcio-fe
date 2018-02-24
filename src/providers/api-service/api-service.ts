import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { config } from '../../environments/environment.dev';
import { catchError, retry } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

@Injectable()
export class ApiService {
  
  baseUrl: string;

  constructor(public http: HttpClient) {
    this.baseUrl = `${config.apiHost}:${config.apiPort}/${config.apiBase}`;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    
    return new ErrorObservable(
      'Something bad happened; please try again later.');
  };

  public get(uri: string) {
    let url = `${this.baseUrl}/${uri}`;
    return this.http.get(url, { observe: 'response' })
    .pipe(
     retry(3),
     catchError(this.handleError)
     );
  }

  public post(uri: string, data: any, headerOptions = {}) {
    let url = `${config.apiHost}:${config.apiPort}/${config.apiBase}/${uri}`;
    return this.http.post(url, data, headerOptions)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

}
