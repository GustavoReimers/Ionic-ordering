import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { FiremanageProvider } from '../../providers/firemanage/firemanage';
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  profile: any;
  loading: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public fireData: FiremanageProvider,
    public toastCtrl: ToastController, public loadingCtrl: LoadingController) {
    this.profile = this.fireData.profile
  }
  saveProfile() {
    this.fireData.updateProfile(this.profile);
    this.showLoading();
  }
  showLoading() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();
    var self = this;
    setTimeout(() => {
      loading.dismiss();
      self.showToast("Profile Successfully Saved.");
    }, 2000);
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
    console.log('ionViewDidLoad ProfilePage');
  }

}
