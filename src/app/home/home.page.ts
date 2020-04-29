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


  stock = '';
  current_username: any = "Please Log-in";
  current_user: any = [];
  db = firebase.firestore();
  

  constructor(private router: Router, private sidemenu: MenuController, 
    public bserv: BeverageService, private cref : ChangeDetectorRef ) {

  }
  ngOnInit(){
    this.getCurrUser();
    // this.updateChart();
    this.cref.detectChanges();
  }

  ngAfterViewInit(){
    this.getCurrUser();
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

  async getCurrUser() {
    console.log("IN CURR USER FUNCTION")
    var usernameid;
    if(firebase.auth().currentUser != null){
      let self = this;
      usernameid = firebase.auth().currentUser.uid
      await self.db.collection("users").where("uid", "==", usernameid).get().then(function(querySnapshot) {
        this.current_user = [];
        querySnapshot.forEach(function(doc) {
          console.log(doc.id, "=>", doc.data())
          let userstuff = doc.data();
          console.log("firstname: ", userstuff.firstName);
          self.current_user.push = ({
            firstName: userstuff.firstName,
            lastName: userstuff.lastName,
            age: userstuff.age
          });
        })
        
      }).catch(function(error) {
        console.log("Error getting documents: ", error)
        alert("Login failed, try again.")
      })
      this.current_user = self.current_user;
      
    }
    
    console.log("UserName: ", this.current_user.firstName, " ", this.current_user.lastName)
  }
  doRefresh(event){
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
}