import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

/**
 * Generated class for the OrderdonePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-orderdone',
  templateUrl: 'orderdone.html',
})
export class OrderdonePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  ionViewDidLoad() {
    var self = this;
    setTimeout(() => {
      self.navCtrl.setRoot(HomePage);
    }, 2000);
  }
}
