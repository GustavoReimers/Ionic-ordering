import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { FiremanageProvider } from '../../providers/firemanage/firemanage';
import { providerDef } from '@angular/core/src/view/provider';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  orderDate;
  products = [];
  orderProducts = [];
  address = "";
  totalPrice: any;
  isOrder = false;
  loading: any;
  temp: any;
  constructor(public navCtrl: NavController, public fireData: FiremanageProvider, public toastCtrl: ToastController, public loadingCtrl: LoadingController) {
    this.orderDate = new Date().toISOString();
    this.showLoading("Loading Products");
    var self = this;    
    this.fireData.getProducts().then(function (snapshot) {
      console.log("products", snapshot.val());
      self.temp = snapshot.val();
      var arr = [];
      for (var x in self.temp) {
        arr.push({
          name: self.temp[x].name,
          price: self.temp[x].price,
          qty: 0
        });
      }
      self.products = [];
      self.products = arr;
      self.dismissLoading();
      self.address = self.fireData.profile.address;
    });

    console.log(this.products);
  }
  calcTotal() {
    var tempPrice = 0;
    for (var i = 0; i < this.products.length; i++) {
      tempPrice += this.products[i].price * this.products[i].qty;
    }
    this.totalPrice = tempPrice.toFixed(2);
    if (this.totalPrice != 0 && this.address != '') {
      this.isOrder = true;
    } else {
      this.isOrder = false;
    }
  }
  doOrder() {
    if (this.address != "" && this.totalPrice != 0) {
      var tempOrder = [];
      for (var i = 0; i < this.products.length; i++) {
        if (this.products[i].qty != 0) {
          var tmpOjb = {};
          tmpOjb[this.products[i].name] = this.products[i].qty
          tempOrder.push(tmpOjb);
        }
      }
      var orderData = {
        created_at: this.orderDate,
        total: this.totalPrice,
        email: this.fireData.profile.email,
        products: tempOrder
      }
      this.fireData.doOrder(orderData);
      this.ordering();
    }
  }
  ordering() {
    let loading = this.loadingCtrl.create({
      content: 'Saving Order...'
    });

    loading.present();
    var self = this;
    setTimeout(() => {
      loading.dismiss();
      self.totalPrice = 0;
      self.address = '';
      self.orderDate = new Date().toISOString();
      self.showToast("Successfully Ordered.");
      var arr = [];
      for (var x in self.temp) {
        arr.push({
          name: self.temp[x].name,
          price: self.temp[x].price,
          qty: 0
        });
      }
      self.products = [];
      self.products = arr;
    }, 2000);
  }
  showLoading(msg) {
    this.loading = this.loadingCtrl.create({
      content: msg
    });
    this.loading.present();
  }
  dismissLoading() {
    this.loading.dismiss();
  }
  showToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }
}