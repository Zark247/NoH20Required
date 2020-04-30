import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { BeverageService } from '../beverage.service';
import { IonItemSliding } from '@ionic/angular';
import * as firebase from "firebase";

@Component({
  selector: 'app-beverage-cart',
  templateUrl: './beverage-cart.page.html',
  styleUrls: ['./beverage-cart.page.scss'],
})
export class BeverageCartPage implements OnInit {

  carts = []
  drink = null;
  mySubscription:any;

  constructor( 
    private router: Router, 
    private aRoute:ActivatedRoute,
    public beverageService: BeverageService) {
    this.beverageService.getObservable().subscribe((data) => {
      console.log('Data received', data);
      this.carts = this.beverageService.cart
    })
    console.log(firebase.auth().currentUser)
  }
                  
  ngOnInit() {
    this.beverageService.cartRefresh()
    this.aRoute.params.subscribe(
      param => {
        this.drink = param;
        console.log(this.drink.docID);
      }
    );
  }

  home() {
    this.router.navigate(['/home'])
  }
  clearCart(){
    this.beverageService.clearCart();
    console.log("Cart cleared.")
    alert("Cart cleared.")
  }

  deleteDrink(docID, cart: IonItemSliding) {
    let index = this.carts.indexOf(cart);
    if (index > -1) {
      this.carts.splice(index, 1);
    }
    this.beverageService.deleteDrink(docID)
  }
  
}
