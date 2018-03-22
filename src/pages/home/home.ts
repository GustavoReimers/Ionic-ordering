import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { FiremanageProvider } from '../../providers/firemanage/firemanage';
import { RestProvider } from '../../providers/rest/rest';
import { providerDef } from '@angular/core/src/view/provider';
import { ModalController } from 'ionic-angular';
import { NgZone } from "@angular/core";
import { DateinfoPage } from '../dateinfo/dateinfo';


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
  temp2: any;
  mLetter = "";
  mLetter2 = "";
  products2 = [];

  constructor(public navCtrl: NavController, public fireData: FiremanageProvider,public modalCtrl: ModalController,
    public ngZone: NgZone, public atrCtrl: AlertController, public toastCtrl: ToastController,
    public loadingCtrl: LoadingController, public restProvider: RestProvider) {

    this.orderDate = new Date().toISOString();
    this.showLoading("Loading Products");
    var self = this;
    this.getProducts2();
    this.fireData.getProducts().then(function (snapshot) {

      self.temp = snapshot.val();
      var arr = [];
      for (var x in self.temp) {
        if (self.temp[x].name[0].toUpperCase() == self.mLetter.toUpperCase()) {
          arr.push({
            letter: "",
            name: self.temp[x].name,
            price: self.temp[x].price,
            qty: 0
          });
        }
        else {
          self.mLetter = self.temp[x].name[0].toUpperCase();
          arr.push({
            letter: self.mLetter,
            name: self.temp[x].name,
            price: self.temp[x].price,
            qty: 0
          });
        }
      }

      self.totalPrice = 0.0;
      self.products = [];
      self.products = arr;
      console.log("List", self.products);
      self.dismissLoading();
      self.address = self.fireData.profile.address;
    });

    console.log(this.products);
  }

  getProducts2() {
    this.restProvider.getProducts()
      .then(data => {
        //this.products2 = data;
        console.log("Products 2", data);

        var self = this;
        self.temp2 = data;
        var arr = [];

        for (var x in self.temp2) {
          if (self.temp2[x].name[0].toUpperCase() == self.mLetter2.toUpperCase()) {
            arr.push({
              letter: "",
              name: self.temp2[x].name,
              price: 1,
              qty: 0
            });
          }
          else {
            self.mLetter2 = self.temp2[x].name[0].toUpperCase();
            arr.push({
              letter: self.mLetter2,
              name: self.temp2[x].name,
              price: 1,
              qty: 0
            });
          }
        }

        self.totalPrice = 0.0;
        self.products2 = [];
        self.products2 = arr;
        console.log("List 2", self.products2);
      });
  }

  plusProduct(nIndex) {
    // if(this.products[nIndex].qty > 0)
    {
      this.products[nIndex].qty++;
    }
  }
  minusProduct(nIndex) {
    console.log(this.products[nIndex]);
    if (this.products[nIndex].qty > 0) {
      this.products[nIndex].qty--;
    }
  }
  calcTotal() {
    var tempPrice = 0;
    for (var i = 0; i < this.products.length; i++) {
      tempPrice += this.products[i].price * this.products[i].qty;
    }
    this.totalPrice = tempPrice.toFixed(2);
    if (this.totalPrice > 0) {
      this.isOrder = true;
    } else {
      this.isOrder = false;
    }
  }
  doOrder() {
    if (this.totalPrice > 0) {
      var tempOrder = [];
      for (var i = 0; i < this.products.length; i++) {
        if (this.products[i].qty != 0) {
          // var tmpOjb = {};
          // tmpOjb[this.products[i].name] = this.products[i].qty
          tempOrder.push(this.products[i]);
        }
      }
      var orderData = {
        created_at: new Date().toISOString(),
        delivery_date: this.orderDate,
        address: this.address,
        total: this.totalPrice,
        email: this.fireData.profile.email,
        products: tempOrder
      }
      this.navCtrl.push(DateinfoPage,{data:orderData});
      // this.fireData.doOrder(orderData);
      // this.ordering();
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

      let alert = self.atrCtrl.create({
        title: 'Order Success!',
        subTitle: 'Products successfully ordered!',
        buttons: ['OK']
      });
      alert.present();

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