import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToasterService } from '../../services/toaster.service';

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
    email: '',
    password: ''
  };

  user: any;
  error: string;
  username: any;

  constructor(
    private session: AuthService,
    private router: Router,
    private toaster: ToasterService,
  ) { }

  ngOnInit() {
  }

  loginBrand() {
    this.session
      .loginCompany(this.formInfo)
      .then(user => {
        this.user = user;
        this.router.navigate(['company', this.user.username]);
        this.toaster.info(`${this.user.username}`, `Welcome back`);
      })
      .catch((error) => {
        this.error = error;
        if (this.formInfo.email === '' || this.formInfo.password === '') {
          this.toaster.error('Please, fill all the fields to login', 'Empty fields');
        } else {
          // tslint:disable-next-line:max-line-length
          this.toaster.error('Make sure you are registered and login in your role and check if the email and password are correct', 'User not found');
        }
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
        this.error = error;
        if (this.formInfo.email === '' || this.formInfo.password === '') {
          this.toaster.error('Please, fill all the fields to login', 'Empty fields');
        } else {
          // tslint:disable-next-line:max-line-length
          this.toaster.error('Make sure you are registered and login in your role and check if the email and password are correct', 'User not found');
        }
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
