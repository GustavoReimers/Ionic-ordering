import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';
import { SignupPage } from '../pages/signup/signup';
import { ForgotPage } from '../pages/forgot/forgot';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { FiremanageProvider } from '../providers/firemanage/firemanage';

export const firebaseConfig = {
  apiKey: "AIzaSyD5S7lfdx1iZFm9oHJqke3--fCxqYamBE8",
  authDomain: "wholesale-app-d5f71.firebaseapp.com",
  databaseURL: "https://wholesale-app-d5f71.firebaseio.com",
  projectId: "wholesale-app-d5f71",
  storageBucket: "wholesale-app-d5f71.appspot.com",
  messagingSenderId: "434577079714"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ProfilePage,
    LoginPage,
    SignupPage,
    ForgotPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ProfilePage,
    LoginPage,
    SignupPage,
    ForgotPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    FiremanageProvider,
  ]
})
export class AppModule { }
