import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
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

  constructor(private router: Router, public bserv:BeverageService, public cref:ChangeDetectorRef) {

    this.bserv.getObservable().subscribe((data)=>{
      console.log("User data received", data);
      this.users = this.bserv.getUserData();

    })

 
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.users = this.bserv.users;


    // this.mySub = this.router.events.subscribe((event) => {
    //   if (event instanceof NavigationEnd) {
    //     this.router.navigated = false;
    //   }
    // });
   }

  ngOnInit() {
    // this.bserv.dataRefresh();
    this.users = this.bserv.getUserData();
    if(firebase.auth().currentUser != null){
      this.singleDetails();
      this.bserv.dataRefresh();
    }
    this.cref.detectChanges();
  }
  ngAfterViewInit()	{
    if(firebase.auth().currentUser != null){
      this.singleDetails();
      this.bserv.dataRefresh();
    }
  
  }	


  ngOnChanges() {
    if(firebase.auth().currentUser != null){
      this.singleDetails();
      this.bserv.dataRefresh();
    }
  }

  editDetails(){
    this.router.navigate(['/adduserdetails']);

  }

  singleDetails(){
    let self = this;
    this.bserv.dataRefresh()
    this.users = this.bserv.users;
    let user_uid = firebase.auth().currentUser.uid;
    this.users.forEach(function(u_val) {
      if(u_val.uid == user_uid){
        console.log("Found User: ", u_val.firstName)
        self.curr_user_data = {
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

  doRefresh(event){
    
    if(firebase.auth().currentUser != null){
      this.singleDetails();
      this.bserv.dataRefresh();
    }
    
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  // ngOnDestroy() {
  //     console.log("Destroy called in order list, unsubscribed ");
  //   }
  // }  
}
