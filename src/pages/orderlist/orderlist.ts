import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { FiremanageProvider } from '../../providers/firemanage/firemanage';
import { OrderdonePage } from '../orderdone/orderdone';
/**
 * Generated class for the OrderlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-orderlist',
  templateUrl: 'orderlist.html',
})
export class OrderlistPage {
  products = [];
  address = "";
  totalPrice = 0.0;
  orderData: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public fireData: FiremanageProvider,
    public atrCtrl: AlertController, public toastCtrl: ToastController, public loadingCtrl: LoadingController) {
    this.orderData = navParams.get("data");
    console.log(this.orderData);
    this.products = this.orderData.products;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderlistPage');
  }
  goback() {
    this.navCtrl.pop();
  }
  doOrder() {
    this.fireData.doOrder(this.orderData);
    this.ordering();
  }

  ordering() {    
    let loading = this.loadingCtrl.create({
      content: 'Saving Order...'
    });

    loading.present();
    var self = this;
    setTimeout(() => {
      loading.dismiss();
      self.navCtrl.push(OrderdonePage);
    }, 3000);
  }
}
