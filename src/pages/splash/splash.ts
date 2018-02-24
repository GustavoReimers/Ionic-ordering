import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
import { FiremanageProvider } from '../../providers/firemanage/firemanage';
import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the SplashPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-splash',
  templateUrl: 'splash.html',
})
export class SplashPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public fbManager:FiremanageProvider,public afAuth:AngularFireAuth) {
  }

  ionViewDidLoad() {
    setTimeout(() => {
      this.startApp();
    }, 3000);
  }
  startApp() {
    console.log("startApp");
    console.log(this.afAuth.auth.currentUser);
    if(this.afAuth.auth.currentUser != null){
      this.gotoMain();
    }else{
      this.gotoLogin();
    }
  }
  gotoMain() {
    this.fbManager.loginUser(this.afAuth.auth.currentUser.uid);
    this.navCtrl.setRoot(HomePage);
  }
  gotoLogin() {
    this.navCtrl.setRoot(LoginPage);
  }
}
