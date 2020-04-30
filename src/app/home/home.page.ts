import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MenuController } from '@ionic/angular';
// import { HttpClientModule } from '@angular/common/http';

// import { Events } from '@ionic/angular';
import * as firebase from 'firebase';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import {ChartDataSets} from 'chart.js';

import {ChartType, ChartOptions} from 'chart.js';

import {MultiDataSet, Label} from 'ng2-charts';
import {Color} from 'ng2-charts';

import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

import { BeverageService } from '../beverage.service';
import * as Chart from 'chart.js';
import { stringify } from 'querystring';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  // CHART ONE
  public chartLabels: Label[] = [['Fl Oz'], ['Drinks'], ['Hours', '(Est)']];
  public chartData: number[] = [ 20, 3, 1.35 ];
  public chartLegend = true;
  public chartPlugins = [pluginDataLabels];
  public chartOptions = {
    responsive:true,
    legend: {
      position: 'left',
    },
    title: {
      display: false,
      text: "Level of Drinking"
    },
    pan:{
      enable:true,
      mode: 'xy'

    },
    zoom:{
      enable:true,
      mode: 'xy'
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
      },
    },
  }
  };
  public chartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
    }
  ];
  public chartType: ChartType = 'pie'

  //CHART TWO
  public BACchartLabels: Label[] = ['Current', '+30mins', '+1hrs',  '+2.5hrs', '+5hrs', '+10hrs'];
  public BACchartData: number[] = [ .12, .09, .09, .06, .04, .01 ];
  public BACchartLegend = false;
  public BACchartPlugins = [pluginDataLabels];
  public BACchartOptions = {
    responsive:true,
    legend: {
      position: 'left',
    },
    title: {
      display: false,
      text: "BAC Levels"
    },
    pan:{
      enable:true,
      mode: 'xy'

    },
    zoom:{
      enable:true,
      mode: 'xy'
    },
      scales: { xAxes: [{}], yAxes: [{}] },
      plugins: {
        datalabels: {
          anchor: 'end',
          align: 'end',
        },
      }
  };
  public BACchartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(255,0,0,0.3)', 'rgba(0,0,255,0.3)','rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
    }
  ];
  public BACchartType: ChartType = 'bar'

  // END OF CHARTS
  current_username: any = "Anon";
  current_bac: any = 0;
  current_drinks: any = 0;
  current_liquidoz:any = 0;
  current_timespent:any = 0;
  min_bac :any = 0;one_bac :any = 0; two_bac :any = 0; five_bac :any = 0; ten_bac :any = 0;  

  current_user = [];
  current_user_data = {
    name:null,
    weight: null,
    gender:null,
    BAC:null,
    drinksDrunk:null,
    timeDrinking:null,
    alc:null,
    liquidOzs:null
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
        weight:info.weight,
        gender:info.gender,
        BAC:info.BAC,
        drinksDrunk:info.drinksDrunk,
        timeDrinking:info.timeDrinking,
        alc:info.alc,
        liquidOzs:info.liquidOzs

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
        weight:info.weight,
        gender:info.gender,
        BAC:info.BAC,
        drinksDrunk:info.drinksDrunk,
        timeDrinking:info.timeDrinking,
        alc:info.alc,
        liquidOzs:info.liquidOzs
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

  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
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

      this.current_bac =  parseFloat(this.current_user_data.BAC);
      this.current_drinks = parseFloat(this.current_user_data.drinksDrunk);
      this.current_timespent = parseFloat(this.current_user_data.timeDrinking);
      this.current_liquidoz = parseFloat(this.current_user_data.liquidOzs)

      this.chartData = [ this.current_liquidoz, this.current_drinks, this.current_timespent ];

      // Bac Calc for over time

      let liqFloat = parseFloat(this.current_user_data.liquidOzs);
      let alcFloat = parseFloat(this.current_user_data.alc);
      let weightFloat = parseFloat(this.current_user_data.weight);
      let genderS = <string>(this.current_user_data.gender);
      let timeFloat = parseFloat(this.current_user_data.timeDrinking); 

      this.min_bac = this.bserv.getBAC(liqFloat, alcFloat, weightFloat, genderS, timeFloat + 0.30);
      this.one_bac = this.bserv.getBAC(liqFloat, alcFloat, weightFloat, genderS, timeFloat + 1.00);
      this.two_bac = this.bserv.getBAC(liqFloat, alcFloat, weightFloat, genderS, timeFloat + 2.50);
      this.five_bac = this.bserv.getBAC(liqFloat, alcFloat, weightFloat, genderS, timeFloat + 5.00);
      this.ten_bac = this.bserv.getBAC(liqFloat, alcFloat, weightFloat, genderS, timeFloat + 10.00);

      this.BACchartData = [this.current_bac, parseFloat(this.min_bac), parseFloat(this.one_bac),
           parseFloat(this.two_bac), parseFloat(this.five_bac), parseFloat(this.ten_bac)];




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