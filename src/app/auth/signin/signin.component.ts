import { Component, OnInit } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { AuthService } from 'src/app/services/auuth.service';
import { UtilityService } from 'src/app/services/util.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  userCred: any = {};

  constructor(
    public authService: AuthService,
    private utilService: UtilityService
  ) {}

  ngOnInit(): void {}

  onSignIn() {
    this.utilService.showLoading();
    this.authService.SignIn(this.userCred.email, this.userCred.password);
  }

  onSignUp() {
    this.authService.SignUp(this.userCred.email, this.userCred.password);
  }
}
