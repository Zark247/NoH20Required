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

  db = firebase.firestore()
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
				//'new': "true"

		    })
		    .then(function(docRef) {
				console.log("usetype written with ID: ", docRef.id);
		      })
		      .catch(function(error) {
		          console.error("Error adding document: ", error);
		      });
		console.log("finished creating account")
		console.log(user.uid)
		/*
		console.log("Please log in")
		self.router.navigate(["/login"]);
		*/
		firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
			//catches errors from login method
			let errorCode = error.code
			let errorMessage = error.message
			console.log("Error code: ", errorCode)
			console.log("Error message: ", errorMessage)
			//pushes alerts to user based on error
			if(errorCode === "auth/wrong-password") {
			  alert("Wrong password.")
			} else if(errorCode === "auth/user-not-found") {
			  alert("User does not exist or wrong email.")
			}
			console.log(error)
		  }
		  ).then(function(result) {
			let user = firebase.auth().currentUser
			self.db.collection("users").where("uid", "==", user.uid).get().then(function(querySnapshot) {
			  querySnapshot.forEach(function(doc) {
				console.log(doc.id, "=>", doc.data())
				let firstName = doc.data().firstName
				console.log("First Name:", firstName)
				
			  })
			}).catch(function(error) {
			  console.log("Error getting documents: ", error)
			  alert("Login failed, try again.")
			})
			console.log("Login successful")
			alert("Login successful, please fill out next page.")
			self.router.navigate(['/adduserdetails'])
		  })

		});
	}
}

}