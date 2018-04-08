import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css']
})
export class CompanyProfileComponent implements OnInit {

  toggleMenu: boolean;

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

  menuControl() {
    this.toggleMenu = !this.toggleMenu;
  }

}
