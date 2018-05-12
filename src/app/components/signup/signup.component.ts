import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToasterService } from '../../services/toaster.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  @Output() close = new EventEmitter<any>();
  @Output() change = new EventEmitter<any>();

  toggleSignup: boolean;

  formInfo = {
    username: '',
    email: '',
    password: ''
  };

  public myColors = ['#EE5622', '#ECA72C', '#44355B', '#28AFB0', '#28AFB0'];
  user: any;
  error: string;

  constructor(
    private session: AuthService,
    private router: Router,
    private toaster: ToasterService
  ) {
  }

  ngOnInit() {
  }

  signupBrand() {
    this.session
      .signupBrand(this.formInfo)
      .then(user => {
        this.user = user;
        this.router.navigate(['company', this.user.username]);
        // tslint:disable-next-line:max-line-length
        this.toaster.success('Please, complete your profile to take advantage of the full potential of cofluencer', `Welcome ${this.user.username}`);
      })
      .catch((err) => {
        this.error = err;
        if (err) {
          this.toaster.error('Change your signup info to create a new account', 'Username or email already exists');
        }
      });
  }

  signupInfluencer() {
    this.session.signupInfluencer(this.formInfo)
      .then(user => {
        this.user = user;
        this.router.navigate(['influencer', this.user.username]);
        // tslint:disable-next-line:max-line-length
        this.toaster.success('Please, complete your profile to take advantage of the full potential of cofluencer', `Welcome ${this.user.username}`);
      })
      .catch((err) => {
        this.error = err;
        if (err) {
          this.toaster.error('Change your signup info to create a new account', 'Username or email already exists');
        }
      });
  }

  closeSignup(event) {
      this.close.emit();
  }

  changeModal(event) {
    this.change.emit(event);
  }

  controlUser() {
    this.toggleSignup = !this.toggleSignup;
  }

}
