import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { LoginPage } from '../login/login';

// @IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  user: any;
  
  constructor(
    private nav: NavController,
    private auth: AuthService,
    public navParams: NavParams
  ) {
    console.log('navParams.data;', navParams.data);
    this.user = navParams.data;
  }
  
  public logout() {
    this.auth.logout()
      .subscribe(succ => {
        this.nav.setRoot(LoginPage);
      });
  }
}