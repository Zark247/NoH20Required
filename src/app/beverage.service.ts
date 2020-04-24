import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { Observable, Subject } from 'rxjs';
import * as firebase from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class BeverageService {
  db = firebase.firestore()
  private eventSubject = new Subject<any>()
  drinks:Array<any> = []
  
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

  async refresh() {
    let self = this
    await self.db.collection("beverages").onSnapshot(function(querySnapshot) {
      self.drinks = []
      querySnapshot.forEach(function(doc) {
        let drink = doc.data()
        self.drinks.push({
          name: drink.name,
          percentage: drink.percentage,
          img: drink.img
        })
      })
      self.publishEvent({})
      console.log("Beverage list loaded")
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