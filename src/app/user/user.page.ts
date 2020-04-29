import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { Route } from '@angular/compiler/src/core';
import { ChangeDetectorRef } from '@angular/core';
import {BeverageService} from '../beverage.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {


  content:boolean;
  mySub:any;
  users = [];
  curr_user_data = {
    firstName:"",
    lastName:"",
    weight:"",
    gender:"",
    phoneNumber:"",
    email:""

  };

  constructor(private router: Router, public bserv:BeverageService, private cref:ChangeDetectorRef) {

    this.bserv.getObservable().subscribe((data)=>{
      console.log("User data received", data);
      this.users = this.bserv.getUserData();

    })

    this.users = this.bserv.users;
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    // this.mySub = this.router.events.subscribe((event) => {
    //   if (event instanceof NavigationEnd) {
    //     // Trick the Router into believing it's last link wasn't previously loaded
    //     this.router.navigated = false;
    //   }
    // });
   }

  ngOnInit() {
    this.users = this.bserv.getUserData();
    if(firebase.auth().currentUser != null){
      this.showDetails();
    }
  
  }

  editDetails(){
    this.router.navigate(['/adduserdetails']);

  }

  showDetails(){
    let user_uid = firebase.auth().currentUser.uid;

    this.users.forEach(function(u_val) {
      if(u_val.uid == user_uid){
        console.log("Found User: ", u_val.firstName)
        this.curr_user_data = {
          firstName: u_val.firstName,
          lastName: u_val.lastName,
          weight: u_val.weight,
          gender: u_val.gender,
          phoneNumber:u_val.phoneNumber,
          email:u_val.email
        }
      }
    });

  }

}
