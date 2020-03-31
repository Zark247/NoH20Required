import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MenuController } from '@ionic/angular';

// import { Events } from '@ionic/angular';
import * as firebase from 'firebase';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router: Router, private sidemenu: MenuController) {}

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
    this.router.navigate(['/beverage-cart']);
  }

  toUser() {
    this.router.navigate(['/user']);

  }

  toLocation(){
    this.router.navigate(['location']);
  }

  toSettings(){
    this.router.navigate(['settings']);
  }

  logOut() {
    var self = this;
    firebase.auth().signOut().then(function() {
      console.log("Logout Successful");
      self.router.navigate(['/login']);
    }).catch(function(error){
      console.error("Error upon logging out: ", error);
    });
    //var user = firebase.auth().currentUser;
    // this.pService.orders = [];
    // this.pService.setUsertype("null");
    
   
  }
}
