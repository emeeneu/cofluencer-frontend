import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-app-page',
  templateUrl: './app-page.component.html',
  styleUrls: ['./app-page.component.css']
})
export class AppPageComponent implements OnInit {

  constructor(
    private session: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  logout() {
    this.session.logout();
    this.router.navigate(['/']);
  }

}
