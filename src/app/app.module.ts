import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
// Home Page Charts
import 'chartjs-plugin-zoom';
// import {Chart} from 'chart.js';
// import { Ng2GoogleChartsModule, GoogleChartsSettings } from 'ng2-google-charts';

//added for location
import { GoogleMaps } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import { AngularFirestore } from '@angular/fire/firestore';
//added for the signup page
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
// import { AngularFireStorageModule } from '@angular/fire/storage';
// import { AngularFireAuthModule } from '@angular/fire/auth';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, 


    //added for the signup page
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    // AngularFireAuthModule,
    // AngularFireStorageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    // {provide: googleChartsSettings, useValue: MyGoogleChartsSettings},
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    GoogleMaps,
    Geolocation,
    AngularFirestore,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
