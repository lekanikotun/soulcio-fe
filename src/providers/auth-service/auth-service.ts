import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import * as moment from "moment";

import { ApiService } from '../api-service/api-service';

export class User {
  name: string;
  email: string;

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}

@Injectable()
export class AuthService {
  currentUser: User;
  
  constructor( private api: ApiService) { }
  
  private setSession(authResult) {
    // const expiresAt = moment().add(authResult.expiresIn,'second');
    localStorage.setItem('id_token', authResult.data.token);
    // localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
  }
  
  public login(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    }
    return this.api.post('login', credentials)
      .do(this.setSession);
  }

  public register(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      // At this point store the credentials to your backend!
      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
    }
  }

  public getUserInfo() : User {
    return this.currentUser;
  }

  /*public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }*/
  
  public logout() {
    return this.api.get('logout');
  }
}