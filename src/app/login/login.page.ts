import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as firebase from 'Firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  new_user_form:FormGroup
  db = firebase.firestore()

  constructor(private router:Router,
    public formBuilder:FormBuilder) { }

  ngOnInit() {
    
    this.new_user_form = this.formBuilder.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  signUp() {
    this.router.navigate(['/signup'])
  }
  
  login(user) {
    let email = user.email
    let password = user.password
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      //catches errors from login method
      let errorCode = error.code
      let errorMessage = error.message
      console.log("Error code: ", errorCode)
      console.log("Error message: ", errorMessage)
      //pushes alerts to user base on error
      if(errorCode === "auth/wrong-password") {
        alert("Wrong password.")
      } else if(errorCode === "auth/user-not-found") {
        alert("User does not exist or wrong email.")
      }
      console.log(error)
    }
    ).then(function(result) {
      let user = firebase.auth().currentUser
      this.db.collection("usertype").where("uid", "==", user.uid).get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          console.log(doc.id, "=>", doc.data())
          let type = doc.data().usertype
          console.log("Usertype: ", type)
          //set user type here
        })
      }).catch(function(error) {
        console.log("Error getting documents: ", error)
        alert("Login failed, try again.")
      })
      console.log("Login successful")
      alert("Login successful")
      this.router.navigate("/home")
    })
  }
  
}
