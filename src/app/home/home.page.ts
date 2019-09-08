import { Component } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Platform } from '@ionic/angular';

import * as firebase from 'firebase';

import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private router: Router,
    private platform: Platform,
    private afAuth: AngularFireAuth,
    private gp: GooglePlus
  ) {}

  async login() {
    let params = this.platform.is('android') ? {
      'webClientId': environment.webClientId,
      'offline': true
    } : { };
    try {
      const { idToken, accessToken } = await this.gp.login(params);
      const credential = accessToken ? 
        firebase.auth.GoogleAuthProvider.credential(idToken, accessToken) : 
        firebase.auth.GoogleAuthProvider.credential(idToken);
      const result = await this.afAuth.auth.signInWithCredential(credential);
      this.router.navigate(['profile']);
    } catch(error) {
      console.log(error);
      alert('error:' + JSON.stringify(error));
    }
  }

}
