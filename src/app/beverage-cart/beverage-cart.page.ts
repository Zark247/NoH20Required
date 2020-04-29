import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { BeverageService } from '../beverage.service';

import * as firebase from "firebase";

@Component({
  selector: 'app-beverage-cart',
  templateUrl: './beverage-cart.page.html',
  styleUrls: ['./beverage-cart.page.scss'],
})
export class BeverageCartPage implements OnInit {

  cart = [];
  //drink = null;
  mySubscription:any;
  constructor( 
      private router: Router, 
      public beverageService: BeverageService,
    ){
      this.beverageService.getObservable().subscribe((data) => {
        console.log('Data received', data);
        this.cart = this.beverageService.getCart();
      });
      console.log(firebase.auth().currentUser)
      if (firebase.auth().currentUser ==  null){
        console.log("user not logged in");
      }
  }
                  

  ngOnInit() {
  
  }

}
