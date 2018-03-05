import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
/**
 * Generated class for the NotiModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-noti-modal',
  templateUrl: 'noti-modal.html',
})
export class NotiModalPage {
  order: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.order = { "id": 1, "status": "RECEIVED", "from": { "name": "Sichuan House", "address": { "stree": "123 main street", "city": "atlanta", "state": "GA", "zipcode": "30022" }, "phone": "6789012345" }, "to": { "name": "Zhang San", "address": { "stree": "456 main street", "city": "atlanta", "state": "GA", "zipcode": "30022" }, "phone": "4567890123", "specialNote": "Please use gate code 234. Call me when you are about here" } }
    //this.navParams.get('order');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotiModalPage');
  }
  closeModal() {
    var data = {order:this.order}
    this.viewCtrl.dismiss(data);
  }
  takeOrder(index) {
    this.order.status = "TAKEN";
    this.closeModal();
  }
  ignoreOrder(index) {
    this.closeModal();
  }
  pickOrder(index) {
    this.order.status = "PICKED_UP";
    var data = {order:null}
    this.viewCtrl.dismiss(data);
  }
  deliverOrder(index) {
    this.order.status = "DELIVERED";
    this.closeModal();
  }
}
