import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { BeverageService } from "../beverage.service";

@Component({
  selector: 'app-beverage-list',
  templateUrl: './beverage-list.page.html',
  styleUrls: ['./beverage-list.page.scss'],
})
export class BeverageListPage implements OnInit {
  drinks = []
  constructor(private router:Router,
    public beverageService:BeverageService) { 
      this.beverageService.getObservable().subscribe((data) => {
        console.log("Data received: ", data)
        this.drinks = this.beverageService.drinks
    })
  }

  goToDrink(drink) {
    console.log("Clicked on:", drink.name)
    this.router.navigate(["/beverage-info",drink])
  }

  ngOnInit() {
  }

}
