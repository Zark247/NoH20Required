import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import * as firebase from 'firebase';

var firebaseConfig = {
  apiKey: "NOPE",
  authDomain: "beverage-app-bec22.firebaseapp.com",
  databaseURL: "https://beverage-app-bec22.firebaseio.com",
  projectId: "beverage-app-bec22",
  storageBucket: "beverage-app-bec22.appspot.com",
  messagingSenderId: "584555622870",
  appId: "1:584555622870:web:34c7db44daf3c544857477",
  measurementId: "G-CV7G292PPF"
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      firebase.initializeApp(firebaseConfig);
    });
  }
}
