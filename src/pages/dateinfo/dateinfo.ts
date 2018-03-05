import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OrderlistPage } from '../orderlist/orderlist';
import { DatePicker } from '@ionic-native/date-picker';
/**
 * Generated class for the DateinfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-dateinfo',
  templateUrl: 'dateinfo.html',
})
export class DateinfoPage {
  orderData: any;
  address = "";
  orderDate;
  today;
  availableDays = [];
  weeks = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  constructor(public navCtrl: NavController, public navParams: NavParams, private datePicker: DatePicker) {
    var someDate = new Date();

    this.orderData = navParams.get("data");
    this.address = this.orderData.address;
    this.orderDate = new Date();
    this.orderDate.setDate(someDate.getDate() + 1);
    this.orderDate = this.weeks[this.orderDate.getDay()] + " (" + this.orderDate.toLocaleDateString('en-AU')+ ")";
    this.today = new Date().toISOString();
    
    someDate = new Date();
    for (var i = 1; i <= 7; i++) {
      var tempdate = new Date();
      tempdate.setDate(someDate.getDate() + i);
      if (tempdate.getDay() == 0 || tempdate.getTime() == someDate.getTime()) {

      } else {      
        this.availableDays.push(this.weeks[tempdate.getDay()] + " (" + tempdate.toLocaleDateString('en-AU')+ ")");
      }
    }
    console.log(this.availableDays);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DateinfoPage');
  }
  opencalendar() {
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    }).then(
      date => console.log('Got date: ', date),
      err => console.log('Error occurred while getting date: ', err)
    );
  }
  goback() {
    this.navCtrl.pop();
  }
  gotoOrder() {
    this.orderData.address = this.address;
    this.orderData.delivery_date = this.orderDate;
    this.navCtrl.push(OrderlistPage, { data: this.orderData });
  }
}
