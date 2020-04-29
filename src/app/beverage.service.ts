import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { Observable, Subject } from 'rxjs';
import * as firebase from 'firebase';
import { debugOutputAstAsTypeScript } from '@angular/compiler';


@Injectable({
  providedIn: 'root'
})
export class BeverageService {
  db = firebase.firestore()
  private eventSubject = new Subject<any>()
  drinks:Array<any> = [];
  cart:Array<any> = [];
  publishEvent(data:any) {
    this.eventSubject.next(data)
  }

  getObservable(): Subject<any> {
    return this.eventSubject
  }

  constructor(public router:Router) { }

  getDrinks(): any {
    let drinksObservable = new Observable(observer => {
      setTimeout(() => {
        observer.next(this.drinks)
      }, 1000)
    })
    return drinksObservable
  }

  /**********************************************
   * Using the Widmark BAC estimation equation:
   * BAC = ( (A * 5.14) / (W * r)) - .015*H
   * 
   * Where : A = BevOz * percentAlc
   * 5.14 = conversion factor from liquid alc to weight
   * W = individual's weight in pounds
   * r = gender factor (Male = .73, Female = .66)
   * (.015) = Alc elimination rate per hour(H)
   * 
   * Typescript things: 'number' = float
   * The below function was tested externally and WORKS
   * If BAC > 0.08 do not Drive
   */
  getBAC(bev_ounces: number, bev_alc: number, ind_weight: number, gender: string, hours: number): any {
    let BAC = 0;
    let female = "female";
    // Calculate bigA (weight of the liquid alc)
    let bev_dec_alc: number = (bev_alc * 0.01); // Convert percent to decimal (should float)
    let bigA = (bev_ounces * bev_dec_alc) * 5.14;
    // Individual's info
    let denominator = 0;

    if(gender.toUpperCase() == female.toUpperCase()) { // Female
      denominator = (ind_weight * 0.66);
    } else { // Male
      denominator = (ind_weight * 0.73);
    }
    // Divide
    let BA = bigA / denominator;
    BAC = BA - ( 0.015 * hours);
    return BAC;
  }

  async refresh() {
    let self = this
    await self.db.collection("beverages").onSnapshot(function(querySnapshot) {
      self.drinks = []
      querySnapshot.forEach(function(doc) {
        let drink = doc.data()
        self.drinks.push({
          name: drink.name,
          percentage: drink.percentage,
          img: drink.img,
          description : drink.description
        })
      })
      self.publishEvent({})
      console.log("Beverage list loaded")
    })
  }


  // Beverage cart functions
  
  getCart():any{var cartObservable = new Observable(observer => {
    setTimeout(()=> {
      observer.next(this.cart);
    }, 1000);
    });
    return cartObservable;
  }
  // getCart(){
  //   return this.cart;
  // }
  addToCart(name, img, percentage, description){
    var self = this;

    var db = firebase.firestore();
    db.collection("cart").add({
      'name':name,
      'img':img,
      'percentage':percentage,
      'description':description,
    }).then(function(docRef){
      console.log("Document written with ID: ", docRef.id);
    }).catch(function(error){
      console.error("Error adding document: ", error);
    })
  }
}

export const snapshotToArray = snapshot => {
  let arr = []
  snapshot.forEach(childSnapshot => {
    let item = childSnapshot.val()
    item.key = childSnapshot.key
    console.log(item)
    arr.push(item)
  })
  return arr
}