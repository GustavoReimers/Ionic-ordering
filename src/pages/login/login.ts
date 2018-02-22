import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import { FiremanageProvider } from '../../providers/firemanage/firemanage';

import { HomePage } from '../home/home';
import { SignupPage } from '../signup/signup';
import { ForgotPage } from '../forgot/forgot';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {
  account: { email: string, password: string } = {
    email: '',
    password: ''
  };
  loading: any;

  constructor(public navCtrl: NavController, public fireData: FiremanageProvider,
    private afAuth: AngularFireAuth, public navParams: NavParams, public toastCtrl: ToastController,public loadingCtrl: LoadingController) {
  }
  async login() {
    try {
      this.showLoading();
      const result = await this.afAuth.auth.signInWithEmailAndPassword(this.account.email, this.account.password);
      if (result) {
        console.log("Result", result);
        this.dismissLoading();
        this.fireData.loginUser(result.uid);
        this.navCtrl.setRoot(HomePage);
      }
    }
    catch (e) {
      this.dismissLoading();
      this.showToast(e.message);
      console.error(e);
    }
  }

  register() {
    this.navCtrl.push(SignupPage);
  }
  forgot(){
    this.navCtrl.push(ForgotPage);
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
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
}
