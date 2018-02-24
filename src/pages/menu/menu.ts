import { Component, ViewChild } from '@angular/core';
import { IonicPage, Nav, NavController, NavParams } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';
import { HomePage } from '../home/home';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { LoginPage } from '../login/login';

/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

export interface PageInterface {
  title: string;
  pageName?: string;
  component?: any;
  tabComponent?: any;
  index?: number;
  icon: string;
}

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})

export class MenuPage {
  
  rootPage: any = 'TabsPage';
  
  @ViewChild(Nav) nav: Nav;
  
  pages: PageInterface[] = [
    { title: 'Home', pageName: this.rootPage, tabComponent: 'HomePage', component: HomePage, icon: 'home' },
    { title: 'About', pageName: this.rootPage, tabComponent: 'AboutPage', component: AboutPage, icon: 'about' },
    { title: 'Contact', pageName: this.rootPage, tabComponent: 'ContactPage', component: ContactPage, icon: 'contact' }
  ];
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) { }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }
  
  openPage(page: PageInterface) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  
  isActive(page) {
    // Again the Tabs Navigation
    let childNav = this.nav.getActiveChildNav();
    
    if (childNav) {
      if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
        return 'primary';
      }
      return;
    }
    
    // Fallback needed when there is no active childnav (tabs not active)
    if (this.nav.getActive() && this.nav.getActive().name === page.pageName) {
      return 'primary';
    }
    return;
  }
  
}