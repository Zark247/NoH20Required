import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-beverage-info',
  templateUrl: './beverage-info.page.html',
  styleUrls: ['./beverage-info.page.scss'],
})
export class BeverageInfoPage implements OnInit {
  current_drink:any
  drink_detail_form:FormGroup
  constructor(public formBuilder:FormBuilder,
    private route:ActivatedRoute) {
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
    console.log("Description: ", this.current_drink.description)
  }

}
