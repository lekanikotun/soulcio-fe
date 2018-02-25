import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading, IonicPage } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../providers/auth-service/auth-service';
import { ApiService } from '../../providers/api-service/api-service';

import { MenuPage } from '../menu/menu';
import { RegisterPage } from '../register/register';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loading: Loading;
  registerCredentials = { email: '', password: '' };
  
  form;

  constructor(
    private navCtrl: NavController,
    private auth: AuthService,
    private api: ApiService,
    private fb: FormBuilder,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController) { }
    
  ionViewDidLoad() {
    this.api.get('login')
        .subscribe(
          res => {
            this.form = this.fb.group({
              email: this.fb.control('', Validators.compose([
               Validators.required,
               Validators.email
               ])),
              // email: this.fb.control('', Validators.required),
              password: this.fb.control('', Validators.required)
            });
          },
          error => {
            console.log('Error', error);
          }
        )
    
  }

  public createAccount() {
    this.navCtrl.push(RegisterPage);
  }

  public login(value) {
    this.registerCredentials = value;
    // this.showLoading();
    this.api.post('login', this.registerCredentials)
      .subscribe(res => {
        console.log('res.headers', res.headers);
        if (res) {
          this.navCtrl.setRoot(MenuPage, { user: res.data });
        } else {
          this.showError("Access Denied");
        }
      },
      error => {
        this.showError(error);
      });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  showError(text) {
    this.loading.dismiss();

    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }
}