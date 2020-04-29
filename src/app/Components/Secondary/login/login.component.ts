import { Component, OnInit } from '@angular/core';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormControl, FormGroup} from '@angular/forms';
import { Router} from '@angular/router';
import * as firebase from 'firebase/app';
import 'firebase/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  errorMessage = '';
  user = new FormGroup({
    email: new FormControl(),
    password: new FormControl()
  });

  constructor(public auth: AngularFireAuth, private router: Router) { }

  ngOnInit(): void {
  }

  login(): void {
    this.errorMessage = '';

    console.log(this.user.get('email').value);
    console.log(this.user.get('password').value);

    this.auth.signInWithEmailAndPassword(this.user.get('email').value, this.user.get('password').value).then((credential) => {
        console.log('ONE');
        if (credential.user.emailVerified){
          this.router.navigate([`/profile`]);
        } else { // if the account is not verified we log out the user
          this.errorMessage = 'your account is not verified, check your email';
          this.auth.signOut().catch((e) => console.log(e));
        }
      })
      .catch((e) => this.errorMessage = 'Incorrect email / password combination!');

    // reset all the values in the form
    this.user.reset();
  }
  onSignup() {
    this.router.navigateByUrl('/register');
  }
}
