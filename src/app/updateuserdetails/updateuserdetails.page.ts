import { Component, OnInit } from '@angular/core';

import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';

import { BeverageService } from '../beverage.service';

import * as firebase from 'firebase';

@Component({
  selector: 'app-updateuserdetails',
  templateUrl: './updateuserdetails.page.html',
  styleUrls: ['./updateuserdetails.page.scss'],
})
export class UpdateuserdetailsPage implements OnInit {

  curr_user_data:any;
  edit_user_form:FormGroup;
  constructor(
    public formBuilder: FormBuilder,
    private route: ActivatedRoute,
    public beverageService: BeverageService,
    private router:Router
  	) { 
  		this.edit_user_form = this.formBuilder.group({
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
        weight: new FormControl('', Validators.required),
        gender: new FormControl('', Validators.required),
        phoneNumber: new FormControl('', Validators.required),
        email: new FormControl(),
      });
        console.log("constructor of UpdateItemPage")
  }

  ngOnInit() {
      console.log("onInit")
      
  		this.route.params.subscribe(
      param => {
        this.curr_user_data = param;
        console.log(this.curr_user_data);

        this.edit_user_form.patchValue({uid:this.curr_user_data.uid});
        this.edit_user_form.patchValue({firstName:this.curr_user_data.firstName});
        this.edit_user_form.patchValue({lastName:this.curr_user_data.lastName});
        this.edit_user_form.patchValue({weight:this.curr_user_data.weight});
        this.edit_user_form.patchValue({gender:this.curr_user_data.gender});
        this.edit_user_form.patchValue({phoneNumber:this.curr_user_data.phoneNumber});
        this.edit_user_form.patchValue({email:this.curr_user_data.email});
      }
    )
  }

  updateUser(value){
    
  	
  	//update the item in the items of th Service Object
  	//need to import the ItemService and create it in constructor
  	let newValues = {
      docId: this.curr_user_data.docId,
      uid: firebase.auth().currentUser.uid,
      firstName: value.firstName,
      lastName: value.lastName,
      weight: value.weight,
      gender: value.gender,
      phoneNumber: value.phoneNumber,
      email: value.email,
    }
    this.beverageService.updateUser(newValues);


   this.goBack();
  }

  goBack(){
    this.router.navigate(['/settings']);
  }


}
