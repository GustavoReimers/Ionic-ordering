import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { HTTP } from '@ionic-native/http';
/*
  Generated class for the FiremanageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FiremanageProvider {
  db: firebase.database.Database;
  uuid: "";
  profile: any;
  products: any;
  constructor(public afAuth:AngularFireAuth,private http: HTTP,) {
    console.log('Hello FiremanageProvider Provider');
    this.profile = {
      email: "",
      pwd: "",
      abn: "",
      address: "",
      company: "",
      name: "",
      phone: "",
      uuid: ""
    }
  }

  registerUser(uid, account) {
    this.db = firebase.database();
    this.uuid = uid;
    this.profile = {
      email: account.email,
      pwd: account.password,
      abn: "",
      address: account.address,
      company: "",
      name: account.name,
      phone: account.phone,
      uuid: uid
    }
    this.db.ref('users/' + uid).set(this.profile);
    // this.getProducts();
  }
  loginUser(uid) {
    this.db = firebase.database();
    this.uuid = uid;
    this.getProfile();
    // this.getProducts();
  }
  getProducts() {
    var self = this;
    return this.db.ref('products/').orderByKey().once('value');
  }
  updateProfile(newPorfile) {
    this.profile = newPorfile;
    this.db.ref('users/' + this.uuid).set(this.profile);
  }
  getProfile() {
    var self = this;
    this.db.ref('users/' + this.uuid).once('value').then(function (snapshot) {
      console.log("profile", self.profile);
      console.log("getprofile", snapshot.val());
      self.profile = snapshot.val();
    });
  }
  doOrder(orderData) {   
    let key = this.db.ref('orders/' + this.uuid).push(orderData).key;
    console.log("key",key);
    this.http.get("http://app.fruitbrothers.com.au/server/index.php", {
      "order_id": key,
      "user_id": this.uuid,
      "email_address": this.profile.email
    }, {})
      .then(data => {
        console.log("Request",data.status);
        console.log("Request",data.data); // data received by server
        console.log("Request",data.headers);
      })
      .catch(error => {
        console.log("Request",error.status);
        console.log("Request",error.error); // error message as string
        console.log("Request",error.headers);
      });
  }
  doLogout(){
    this.afAuth.auth.signOut();
    console.log(this.afAuth.auth.currentUser);
  }
}
