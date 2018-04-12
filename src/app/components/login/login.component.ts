import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  @Output() close = new EventEmitter<any>();
  @Output() change = new EventEmitter<any>();

  toggleLogin: boolean;

  formInfo = {
    username: '',
    password: ''
  };

  user: any;
  error: string;
  username: any;

  constructor(
    private session: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  loginBrand() {
    this.session
      .loginCompany(this.formInfo)
      .then(user => {
        this.user = user;
        this.router.navigate(['company', this.user.username]);
      })
      .catch((error) => {
        console.log('login error', error);
        this.error = error;
      });
  }

  loginInfluencer() {
    this.session
      .loginInfluencer(this.formInfo)
      .then(user => {
        this.user = user;
        this.router.navigate(['app', this.user.username]);
      })
      .catch((error) => {
        console.log('login error', error);
        this.error = error;
      });
  }

  closeLogin() {
    this.close.emit();
  }

  changeModal(event) {
    this.change.emit(event);
  }

  controlUser() {
    this.toggleLogin = !this.toggleLogin;
  }

}
