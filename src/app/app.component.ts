import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class App {
  
  @ViewChild(Nav) nav: Nav;
  
  rootPage:any = LoginPage;
  pages: Array<{title: string, component: any, data: any}>;
  homeData: any;
  
  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen
  ) {
    this.initializeApp();
    // this.homeData = this.navParams.get('user');
    
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage, data: {} },
      { title: 'About', component: AboutPage, data: {} },
      { title: 'Contact', component: ContactPage, data: {} }
    ];
    this.splashScreen.hide();
  }
  
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.show();
    });
  }
  
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
