import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

//added for location
import { GoogleMaps } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation/ngx';

//added for the signup page
// import { AngularFireModule } from '@angular/fire';
// import { AngularFirestoreModule } from '@angular/fire/firestore';
// import { AngularFireStorageModule } from '@angular/fire/storage';
// import { AngularFireAuthModule } from '@angular/fire/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDBs8a1PLhFcXvuB_LIgYKDus9zH8_Kzx8",
  authDomain: "beverage-app-bec22.firebaseapp.com",
  databaseURL: "https://beverage-app-bec22.firebaseio.com",
  projectId: "beverage-app-bec22",
  storageBucket: "beverage-app-bec22.appspot.com",
  messagingSenderId: "584555622870",
  appId: "1:584555622870:web:34c7db44daf3c544857477",
  measurementId: "G-CV7G292PPF"
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, 

    //added for the signup page
    FormsModule
    // AngularFireModule.initializeApp(firebaseConfig),
    // AngularFirestoreModule,
    // AngularFireAuthModule,
    // AngularFireStorageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    GoogleMaps,
    Geolocation
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
