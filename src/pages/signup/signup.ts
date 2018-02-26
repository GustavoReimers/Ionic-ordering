import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import { FiremanageProvider } from '../../providers/firemanage/firemanage';

import { HomePage } from '../home/home';
/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  account: { email: string, password: string, address:string, name:string, phone:string } = {
    email: '',
    password: '',
    address: '',
    name: '',
    phone:''
  };
  loading: any;

  constructor(public navCtrl: NavController, public fireData: FiremanageProvider,
    private afAuth: AngularFireAuth, public navParams: NavParams, public toastCtrl: ToastController, public loadingCtrl: LoadingController) {
  }
  login(){
    this.navCtrl.pop();
  }
  async register() {
    if(this.account.name == "" || this.account.address == "" )
    {
      this.showToast("You should fill the Name and Address fields.");
      return;
    }
    try {
      this.showLoading();
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(
        this.account.email,
        this.account.password
      );
      if (result) {
        console.log("Result", result);
        this.dismissLoading();
        this.fireData.registerUser(result.uid, this.account);
        this.navCtrl.setRoot(HomePage);
      }
    } catch (e) {
      this.dismissLoading();
      this.showToast(e.message);
      console.error(e);
    }
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
