import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MenuController } from '@ionic/angular';
// import { HttpClientModule } from '@angular/common/http';

// import { Events } from '@ionic/angular';
import * as firebase from 'firebase';
import {ChartDataSets} from 'chart.js';

import {ChartType} from 'chart.js';

import {MultiDataSet, Label} from 'ng2-charts';
import {Color} from 'ng2-charts';

import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

import { BeverageService } from '../beverage.service';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  // @ViewChild('doughnutCanvas', {static:false}) doughnutCanvas: ElementRef;

  public chartLabels: Label[] = ['BAC', 'Estimated Cost', 'Hours since last drink'];
  public chartData: MultiDataSet= [
    [0.02, 0, 0],
    [0, 30, 0],
    [0, 0, 0.25]
    
  ];
  public chartOptions = {
    responsive:true,
    title: {
      display: true,
      text: "Level of Drinking"
    },
    pan:{
      enable:true,
      mode: 'xy'

    },
    zoom:{
      enable:true,
      mode: 'xy'
    }
  };
  public chartColors: Color[] = [
    {
      borderColor: '#000000',
      backgroundColor: '#ff00ff'
    
    }
  ];
  public chartType: ChartType = 'pie'
  showLegend = false;


    
  current_username: any = "Please Log-in";
  current_bac: any = "Please Log-in";
  current_drinks: any = "Please Log-in";
  current_timespent:any = "Please Log-in";

  current_user = [];
  current_user_data = {
    name:null,
    BAC:null,
    drinksDrunk:null,
    timeDrinking:null
  };
  db = firebase.firestore();
  

  constructor(private router: Router, private sidemenu: MenuController, 
    public bserv: BeverageService, private cref : ChangeDetectorRef ) {
      this.bserv.getObservable().subscribe((data)=>{
        console.log("User data received", data);
        this.current_user = this.bserv.getUserData();
  
      })

      this.current_user = this.bserv.users;

  }
  ngOnInit(){
    if(firebase.auth().currentUser != null){
      this.getCurrUser();
      this.bserv.dataRefresh();
      let info = this.bserv.getDrinkingInfo();
      console.log("setting user info: ")
      console.log(info.name);
      console.log(info.BAC);
      this.current_user_data = {
        name:info.name,
        BAC:info.BAC,
        drinksDrunk:info.drinksDrunk,
        timeDrinking:info.timeDrinking
      };
      this.current_username = this.current_user_data.name;
      this.setData(); 

    }
    // this.updateChart();
    this.cref.detectChanges();
  }
  ngOnChanges() {
    if(firebase.auth().currentUser != null){
      this.getCurrUser();
      let info = this.bserv.getDrinkingInfo();
      this.current_user_data = {
        name:info.name,
        BAC:info.BAC,
        drinksDrunk:info.drinksDrunk,
        timeDrinking:info.timeDrinking
      };
      this.current_username = this.current_user_data.name;
      this.setData(); 

    }
  }

  ngAfterViewInit(){
    if(firebase.auth().currentUser != null){
      this.getCurrUser();
      this.bserv.dataRefresh();
    }
  }

  openFirst() {
    this.sidemenu.enable(true, 'first');
    this.sidemenu.open('first');
  }

  toBevList() {
    this.router.navigate(['/beverage-list']);
  }

  toSearch() {
    this.router.navigate(['/search']);
  }

  toBevCart() {
    let self = this
    if(firebase.auth().currentUser == null) {
      console.log("Not logged in, directing to log in.")
      alert("Not logged in, directing to log in.")
      self.router.navigate(["/login"])
    } else {
      self.router.navigate(['/beverage-cart']);
    }
  }

  toUser() {
    let self = this
    if(firebase.auth().currentUser == null) {
      console.log("Not logged in, directing to log in.")
      alert("Not logged in, directing to log in.")
      self.router.navigate(["/login"])
    } else {
      self.router.navigate(['/user']);
    }

  }

  toLocation(){
    this.router.navigate(['location']);
  }

  toSettings(){
    this.router.navigate(['settings']);
  }

  logOut() {
    let self = this
    if (firebase.auth().currentUser == null){
      console.log("You weren't logged in, directing to log in.")
      alert("You weren't logged in, directing to log in.")
      self.router.navigate(["/login"])
    } else {
      firebase.auth().signOut().then(function() {
        console.log("Logout Successful, directing to log in.");
        alert("Logout successful.")
        self.router.navigate(['/login']);
     }).catch(function(error){
        console.error("Error upon logging out: ", error)
     })
    }
  }

  login() {
    let self = this
    if (firebase.auth().currentUser == null){
      self.router.navigate(["/login"])
    } else {
      alert("You are already logged in.")
    }
  }

  getCurrUser() {
    let self = this;
    this.bserv.dataRefresh()
    this.current_user = this.bserv.users;
    let user_uid = firebase.auth().currentUser.uid;
    this.current_user.forEach(function(u_val) {
      if(u_val.uid == user_uid){
        console.log("Found User: ", u_val.firstName)
        self.current_username = u_val.firstName
      }
    });
  }

  setData() {
    // Setting data for charts
    if(firebase.auth().currentUser == null){
      console.log("Not Logged in to set data")
    }
    else if(this.current_user_data == null){
      console.log("No Data in the Current User Home Page")
    }
    else {
      console.log("Setting Chart Data")

      this.current_bac = this.current_user_data.BAC;
      this.current_drinks = this.current_user_data.drinksDrunk;
      this.current_timespent = this.current_user_data.timeDrinking;



    }
    


  }

  doRefresh(event){
    
    if(firebase.auth().currentUser != null){
      this.bserv.dataRefresh();
      this.getCurrUser();
      // this.bserv.dataRefresh();
      // let info = this.bserv.getDrinkingInfo();
      // this.current_user_data = {
      //   name:info.name,
      //   BAC:info.BAC,
      //   drinksDrunk:info.drinksDrunk,
      //   timeDrinking:info.timeDrinking
      // };
      this.current_user_data = this.bserv.getDrinkingInfo();
      // this.current_username = this.current_user_data.name;
      this.setData();    
      // this.current_username = this.current_user_data.name;

    }
    
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
}