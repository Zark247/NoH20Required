import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import{BeverageService} from '../beverage.service';
@Component({
  selector: 'app-adduserdetails',
  templateUrl: './adduserdetails.page.html',
  styleUrls: ['./adduserdetails.page.scss'],
})
export class AdduserdetailsPage implements OnInit {

  firstName = "";
  lastName= "";
  weight="";
  gender="";
  phoneNumber="";

  new_details_form:FormGroup
  constructor(private router:Router, public formBuilder: FormBuilder, public bserv: BeverageService ) { }

  ngOnInit() {
    this.new_details_form = this.formBuilder.group({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      weight: new FormControl('', Validators.required),
      gender : new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required),
    })
  }

  
  addDetails(value){
    console.log("First Name: ", value.firstName)
    console.log("Last Name: ", value.lastName)
    this.bserv.addUserData(value.firstName, value.lastName, value.weight, value.gender,value.phoneNumber);
    console.log("Saved User Information!")
    this.goBack();
  }

  goBack(){
    this.router.navigate(['/home']);
  }



}
