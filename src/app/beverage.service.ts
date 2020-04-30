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
  users:Array<any> = [];
  current_user: any = null;
  // user_data:Array<any> = [];

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

  getDrinkingInfo(){
    var self = this;
    var bac = 0;
    var drinksConsumed = 0;
    var hoursDrinking = 0;
    if(firebase.auth().currentUser != null){
      console.log("Getting user info")
      let curr_uid = firebase.auth().currentUser.uid;
      self.users.forEach(function(u_val){
        if (u_val.uid == curr_uid){
          self.current_user = u_val;
        }
      })
      self.publishEvent({})
      console.log("Current User Set in Service");
    }
    if(this.current_user != null && this.cart != null){
      console.log("Setting user info and doing mathematics")
      var alc_totalp : number = 0;
      var total_ozs : number = 0;
      this.cart.forEach(function(addperc){

        console.log("Adding Percentage", addperc.percentage);
        alc_totalp = parseFloat(addperc.percentage) + alc_totalp;
        
        console.log("Adding Ozs: ", addperc.oz);
        total_ozs = total_ozs + parseFloat(addperc.oz);
        
        drinksConsumed = drinksConsumed + 1;
        hoursDrinking = hoursDrinking + 0.45;
      })
      console.log("Total Alcohol Percentage: ", alc_totalp );
      console.log("Total Ounces of Liquid Consumed: ", total_ozs);
      console.log("Drinking For: ", hoursDrinking)
      bac = this.getBAC(<number> total_ozs, <number> alc_totalp, <number> this.current_user.weight, <string> this.current_user.gender, hoursDrinking)

      let drinking_info = {
        name: this.current_user.firstName,
        weight: this.current_user.weight,
        gender:this.current_user.gender,
        BAC:bac,
        drinksDrunk:drinksConsumed,
        timeDrinking:hoursDrinking,
        alc:alc_totalp,
        liquidOzs:total_ozs,
      }

      return drinking_info;


    }
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
    let bigA = (bev_ounces * bev_dec_alc) * 0.789;
    // Individual's info
    let denominator = 0;

    if(gender.toUpperCase() == female.toUpperCase()) { // Female
      denominator = (ind_weight * 0.55);
    } else { // Male
      denominator = (ind_weight * 0.68);
    }
    // Divide
    let BA = bigA / denominator;
    BAC = BA - ( 0.015 * hours);
    if(BAC < 0){
      BAC = 0;
    }
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
          description : drink.description,
          oz: drink.oz,
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
  addToCart(name, img, percentage, description,oz){
    var self = this;
    if(firebase.auth().currentUser != null) {
      let uid = firebase.auth().currentUser.uid
      self.db.collection("cart").add({
        'name':name,
        'img':img,
        'percentage':percentage,
        'description':description,
        'oz':oz,
        'uid': uid
      }).then(function(docRef){
        console.log("Document written with ID: ", docRef.id);
      }).catch(function(error){
        console.error("Error adding document: ", error);
      })
    }
  }

  addUserData(firstName, lastName, weight, gender, phoneNumber){
    var self = this;
    if(firebase.auth().currentUser != null){
      let uid = firebase.auth().currentUser.uid;
      let email = firebase.auth().currentUser.email;
      self.db.collection("userData").add({
        'firstName':firstName,
        'lastName':lastName,
        'weight':weight,
        'gender':gender,
        'phoneNumber':phoneNumber,
        'email':email,
        'uid' : uid
      }).then(function(docRef){
        console.log("User Details Document Written with ID: ", docRef.id);
      }).catch(function(error){
        console.error("Error adding user details document: ", error);
      })
    }
  }

  async dataRefresh(){
    let self = this;
    let user_uid = firebase.auth().currentUser.uid
    await self.db.collection("userData").where("uid", "==", user_uid).onSnapshot(function(querySnap){
      self.users = []
      querySnap.forEach(function(doc){
        let use = doc.data();
        self.users.push({
          firstName: use.firstName,
          lastName: use.lastName,
          weight : use.weight,
          gender: use.gender,
          phoneNumber: use.phoneNumber,
          email: use.email,
          uid: use.uid,
          docId : doc.id 
        })
        console.log("User information loading for : ", use.firstName)
      })
      self.publishEvent({})
      console.log("User information loaded")
    }) 
  }

  getUserData():any{var userObservable = new Observable(observer => {
    setTimeout(()=> {
      observer.next(this.users);
    }, 1000);
    });
    return userObservable;
  }

  async cartRefresh() {
    let self = this;
    await self.db.collection("cart").where("uid", "==", firebase.auth().currentUser.uid)
      .onSnapshot(function(querySnapshot) {
      self.cart = []
      querySnapshot.forEach(function(doc) {
        let cart = doc.data()
        self.cart.push({
          name: cart.name,
          percentage: cart.percentage,
          img: cart.img,
          description : cart.description,
          oz: cart.oz,
          uid: cart.uid,
          docID: doc.id
        })
      })
      self.publishEvent({})
      console.log("Beverage cart loaded for: " +firebase.auth().currentUser.uid)
    })
  }

  async clearCart(){
    let self = this;
    self.db.collection('cart').where('uid', '==', firebase.auth().currentUser.uid).get()
  .then(function(querySnapshot) {
        // Once we get the results, begin a batch
        var batch = self.db.batch();

        querySnapshot.forEach(function(doc) {
            // For each doc, add a delete operation to the batch
            batch.delete(doc.ref);
        });

        // Commit the batch
        return batch.commit();
  }).then(function() {
      // Delete completed!
      // ...
  }); 

  }
  
  deleteDrink(id){

      var self = this;
      var db = firebase.firestore();

      db.collection("cart").doc(id).delete().then(function(){
        console.log("Document deleted");
        console.log("Drink deleted: "+id);
      }).catch(function(error){
        console.log("Error removing document: ", error);
      });
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