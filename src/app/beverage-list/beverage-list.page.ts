import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { BeverageService } from "../beverage.service";
import { AngularFirestore } from '@angular/fire/firestore'
import { Platform } from '@ionic/angular';
 
@Component({
  selector: 'app-beverage-list',
  templateUrl: './beverage-list.page.html',
  styleUrls: ['./beverage-list.page.scss'],
})
export class BeverageListPage implements OnInit {
  drinks = [];
  drinks2 = [];
  drinkList = []
  loadedDrinkList = [];

  constructor(private router:Router,
    public beverageService:BeverageService,
    public fs:AngularFirestore) { 
      this.beverageService.getObservable().subscribe((data) => {
        console.log("Data received: ", data)
        this.drinks = this.beverageService.drinks

    })
  }
  
  home() {
    this.router.navigate(['/home'])
  }

  goToDrink(drink) {
    console.log("Clicked on:", drink.name)
    this.router.navigate(["/beverage-info",drink])
  }

  ngOnInit() {
    this.beverageService.refresh()
  
  }

  initializeItems(){
    this.drinks = this.beverageService.drinks;
  }

  getItems(searchbar) {
    // Reset items back to all of the items
    this.initializeItems();
    
    // set q to the value of the searchbar
    var searchedDrink = searchbar.srcElement.value;


    // if the value is an empty string don't filter the items
    if (!searchedDrink) {
      return;
    }

    this.drinks = this.drinks.filter((drink) => {
      if(drink.name && searchedDrink) {
        console.log("drink name: ", drink.name);
        if (drink.name.toLowerCase().indexOf(searchedDrink.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });

    console.log(searchedDrink, this.drinkList.length);

  }
}