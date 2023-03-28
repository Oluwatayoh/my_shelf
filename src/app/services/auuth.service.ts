import { Injectable, NgZone } from '@angular/core';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { initialState, User } from '../models/user';
import swal from 'sweetalert2';
import { UtilityService } from './util.service';
import { AppStore } from '../state_manahgement/appstore.service';
import { concatMap, from, Observable, of } from 'rxjs';
import { updateDoc } from 'firebase/firestore';
import { getAuth, updateProfile } from 'firebase/auth';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    public utilService: UtilityService,
    public appStore: AppStore
  ) {
    /* Saving user data in localstorage when
    logged in and setting up null when logged out */
    this.getUser();
  }

  // Sign in with email/password
  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.SetUserData(result.user);
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.userData = user;
            this.appStore.setUserState(user);
            this.router.navigate(['bookshelf']);
            this.utilService.hideLoading();
          }
        });
      })
      .catch((error) => {
        this.utilService.hideLoading();
        swal.fire({
          icon: 'error',
          title: error.message,
          showConfirmButton: false,
          timer: 3000,
        });
        // window.alert(error.message);
      });
  }
  // Sign up with email/password
  SignUp(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.SetUserData(result.user);
        this.appStore.setUserState(result.user);
      })
      .catch((error) => {
        swal.fire({
          icon: 'error',
          title: error.message,
          showConfirmButton: false,
          timer: 3000,
        });
      });
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.uid !== null ? true : false;
  }

  /* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }
  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.appStore.setUserState(initialState);
      this.router.navigate(['login']);
    });
  }

  getUser() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.appStore.setUserState(user);
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        this.appStore.setUserState(initialState);
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  updateUser(user: any) {
    this.utilService.showLoading;
       this.afs.doc(`users/${user.uid}`).update({
      displayName: user.displayName,
      emailVerified: true,
      phone: user.phone,
      email: user.email,
    });
    updateProfile(this.userData, {
      displayName: user.displayName.toString(),
      photoURL: 'https://example.com/jane-q-user/profile.jpg',
    })
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Updated Successfully',
          showCancelButton: false,
          timer: 1500,
        });
        // Profile updated!
        // ...
      })
      .catch((error) => {
        // An error occurred
        // ...
      });

    // return updateDoc(userRef, { ...user });
  }
}
