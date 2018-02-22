import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import { FiremanageProvider } from '../../providers/firemanage/firemanage';

import { HomePage } from '../home/home';
import { SignupPage } from '../signup/signup';
import { LoginPage } from '../login/login';
/**
 * Generated class for the ForgotPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgot',
  templateUrl: 'forgot.html',
})
export class ForgotPage {
  account: { email: string } = {
    email: ''
  };
  loading: any;

  constructor(public navCtrl: NavController, public fireData: FiremanageProvider,
    private afAuth: AngularFireAuth, public navParams: NavParams, public toastCtrl: ToastController, public loadingCtrl: LoadingController) {
  }
  login() {
    this.navCtrl.pop();
  }
  forgot() {
    var self = this;
    this.afAuth.auth.sendPasswordResetEmail(this.account.email)
      .then((user) => {
        self.showToast("Please check your email");
       });
  }
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
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
    var self = this;
    setTimeout(() => {
      self.navCtrl.pop();
    }, 2000);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
