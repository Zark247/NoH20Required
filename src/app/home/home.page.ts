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
}
