import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css']
})
export class CompanyProfileComponent implements OnInit {

  user: any;
  toggleMenu: boolean;
  toggleMoreButton: boolean;

  constructor(
    private session: AuthService,
    private router: Router,
    private companyService: CompanyService
  ) { }

  ngOnInit() {
    this.user = this.session.getUser();
    this.getCampaigns();
  }

  logout() {
    this.session.logout();
    this.router.navigate(['/']);
  }

  menuControl() {
    this.toggleMenu = !this.toggleMenu;
  }

  moreButtonControl() {
    this.toggleMoreButton = !this.toggleMoreButton;
  }

  getCampaigns() {
    this.companyService.campaignsList(this.user);
  }

  newCampaign() {
    this.router.navigate(['company/:id/newCampaign']);
  }

}
