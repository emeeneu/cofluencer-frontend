import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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
    password: ''
  };

  user: any;
  error: string;

  constructor(
    private session: AuthService,
    private router: Router,
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
      })
      .catch(err => (this.error = err));
  }

  signupInfluencer() {
    this.session.signupInfluencer(this.formInfo)
      .then(user => {
        this.user = user;
        this.router.navigate(['app', this.user.username]);
      })
      .catch(err => (this.error = err));
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
