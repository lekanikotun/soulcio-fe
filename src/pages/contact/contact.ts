import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ApiService } from '../../providers/api-service/api-service';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  constructor(
    public navCtrl: NavController,
    private api: ApiService,) {

  }
  
  ionViewDidLoad() {
    this.api.get('members')
    .subscribe(
      res => {
        console.log('res', res)
      },
      error => {
        console.log('Error', error);
      }
    )
    
  }
}
