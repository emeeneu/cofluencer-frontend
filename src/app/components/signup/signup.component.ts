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

  signup() {
    this.session
      .signup(this.formInfo)
      .then(user => {
        this.user = user;
        this.router.navigate(['app']);
      })
      .catch(err => (this.error = err));
  }

  closeSignup(event) {
      this.close.emit();
  }

  changeModal(event) {
    this.change.emit(event);
  }

}
