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

  formInfo = {
    username: '',
    password: ''
  };

  user: any;
  error: string;

  constructor(
    private session: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  login() {
    this.session
      .login(this.formInfo)
      .then(user => {
        this.user = user;
        this.router.navigate(['app']);
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

}
