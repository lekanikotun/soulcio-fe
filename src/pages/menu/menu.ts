import { Component, ViewChild } from '@angular/core';
import { IonicPage, Nav, NavController, NavParams } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';
import { HomePage } from '../home/home';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';

/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

export interface PageInterface {
  title: string;
  component?: any;
  tabComponent?: any;
  index?: number;
  icon: string;
  data?: any
}

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})

export class MenuPage {
  
  rootPage: any = TabsPage;
  userData: any;
  pages: PageInterface[];
  
  @ViewChild(Nav) nav: Nav;
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.userData = navParams.get('user');
  
    this.pages = [
      { title: 'Home', tabComponent: TabsPage, component: HomePage, index: 0, icon: 'home' },
      { title: 'About', tabComponent: TabsPage,  component: AboutPage, index: 1, icon: 'about' },
      { title: 'Contact', tabComponent: TabsPage, component: ContactPage, index: 2, icon: 'contact' }
    ];
  }

  openPage(page: PageInterface) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    // this.nav.setRoot('TabsPage', {data: this.userData});
  
    let params = {};
  
    // The index is equal to the order of our tabs inside tabs.ts
    if (typeof page.index !== 'undefined') {
      if (page.title === 'Home') {
        params = Object.assign({tabIndex: page.index}, this.userData)
      } else {
        params = { tabIndex: page.index };
      }
    }
  
    // The active child nav is our Tabs Navigation
    if (this.nav.getActiveChildNav() && typeof page.index != undefined) {
      this.nav.getActiveChildNav().select(page.index);
    } else {
      // Tabs are not active, so reset the root page
      // In this case: moving to or from SpecialPage
      this.nav.setRoot(page.tabComponent, params);
    }
  }
  
  /*isActive(page) {
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
  }*/
  
}