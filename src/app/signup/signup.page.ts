import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  user={
    email:"",
    password:""
  };

  today;
  selectDate;
  firstName = "";
  lastName = "";
  birthDate = "";
  usertype = "visitor";
  age;
  constructor(private router:Router) { 
	  this.today = new Date(); 
  }

  calcAge(){
	  let today:any = new Date();
	  let birthDate:any = new Date(this.birthDate);

	  this.age = today.getFullYear() - birthDate.getFullYear();

	  if(today.getMonth() < birthDate.getMonth())
	  {
		  this.age = this.age -1;
	  }
  }

  ngOnInit() {
  }

  doSignup(){
  	console.log(this.user.email+"  "+this.user.password)
  	var email=this.user.email;
  	var password=this.user.password;
	var self=this;
	if(self.age <= 21) {
		console.log("Underage user.")
		alert("Underage user.")
		self.router.navigate(["/home"])
	} else {
  		firebase.auth().createUserWithEmailAndPassword(email, password).catch(
  			function(error) {
	  			console.log(error);
	  			var errorCode = error.code;
	  			var errorMessage = error.message;
	  			console.log(error.message);
	  			if(errorCode.length > 0){
	  				console.log("Failed");
	  			}
	  			else{
	  				console.log("signup ok")
	  			}
		}).then(function(result){
			var user= firebase.auth().currentUser;
			var db = firebase.firestore();
		    db.collection("users").add({
				'uid':user.uid,
				'firstName':self.firstName,
				'lastName':self.lastName,
				'birthDate':self.birthDate,
				'age':self.age,
		    })
		    .then(function(docRef) {
		    	console.log("usetype written with ID: ", docRef.id);
		      })
		      .catch(function(error) {
		          console.error("Error adding document: ", error);
		      });
		console.log("finished creating account")
		console.log(user.uid)
		self.router.navigate(["/login"]);
		});
	}
}

}