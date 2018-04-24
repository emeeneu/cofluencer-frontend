import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CompanyService } from '../../services/company.service';
import { ToasterService } from '../../services/toaster.service';

@Component({
  selector: 'app-company-public',
  templateUrl: './company-public.component.html',
  styleUrls: ['./company-public.component.css']
})
export class CompanyPublicComponent implements OnInit {

  user: any;
  toggleMenu: boolean;
  toggleMoreButton: boolean;

  constructor(
    private session: AuthService,
    private router: Router,
    private companyService: CompanyService,
    private toaster: ToasterService,
  ) {
  }

  ngOnInit() {
    this.user = this.session.getUser();
    this.getCampaigns();
  }

  logout() {
    this.session.logout();
    this.router.navigate(['/']);
    this.toaster.info(`See you soon ${this.user.username}`);
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
    this.router.navigate(['company', this.user.username, 'new-campaign']);
  }

  editProfile() {
    this.router.navigate(['company', this.user.username, 'edit-profile']);
  }

  campaignDetail(campaignId) {
    this.router.navigate(['company', this.user.username, campaignId]);
  }

}
