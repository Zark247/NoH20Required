import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../theme.service';
import { BeverageService } from '../beverage.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as firebase from 'firebase';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  user = null;
  constructor(
    private themeService:ThemeService,
    private beverageService:BeverageService,
    private router:Router,
    private aRoute:ActivatedRoute,
  ) { }

  ngOnInit() {
    this.user = this.aRoute.snapshot.params;
  }

  // Dark/Light Mode

  enableDark(){
    this.themeService.enableDark();
  }
  enableLight(){
    this.themeService.enableLight();
  }

  updateUserSettings(){
    console.log(this.user);
    this.router.navigate(['/updateuserdetails', this.user]);
  }

  logout(){
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
}
