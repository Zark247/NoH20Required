import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { Router, ActivatedRoute } from '@angular/router';
import { BeverageService } from '../beverage.service'
import * as firebase from 'firebase';

@Component({
  selector: 'app-beverage-info',
  templateUrl: './beverage-info.page.html',
  styleUrls: ['./beverage-info.page.scss'],
})
export class BeverageInfoPage implements OnInit {
  current_drink:any
  drink_detail_form:FormGroup
  constructor(public formBuilder:FormBuilder, private router:Router,
    private route:ActivatedRoute, private beverageService: BeverageService) {
    this.drink_detail_form = this.formBuilder.group({ 
      name: new FormControl(),
      img: new FormControl(),
      percentage: new FormControl(),
      description: new FormControl()
    })
    
   }

  ngOnInit() {
    this.route.params.subscribe(
      param => {
        this.current_drink = param
        this.drink_detail_form.patchValue({name:this.current_drink.name})
        this.drink_detail_form.patchValue({img:this.current_drink.img})
        this.drink_detail_form.patchValue({percentage:this.current_drink.percentage})
        this.drink_detail_form.patchValue({description:this.current_drink.description})
      })
  }

  placeInCart(){
    // if(firebase.auth().currentUser != null){
      this.beverageService.addToCart(this.current_drink.name, this.current_drink.img, this.current_drink.percentage, this.current_drink.description);
      console.log(this.current_drink.name + " added to cart");
      this.goToCart();
    //}
    // else {
    //   console.log("user not logged in");
    // }
  }

  goToCart(){
    this.router.navigate(['/beverage-cart']);
  }

}
