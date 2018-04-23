import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-app-page',
  templateUrl: './app-page.component.html',
  styleUrls: ['./app-page.component.css']
})
export class AppPageComponent implements OnInit {

  user: any;
  toggleMenu: boolean;
  toggleMoreButton: boolean;
  youtubeProfile: boolean;
  twitterProfile: boolean;

  constructor(
    private session: AuthService,
    private router: Router,
    private companyService: CompanyService
  ) { }

  ngOnInit() {
    this.user = this.session.getUser();
    this.checkYoutube();
    this.checkTwitter();
    this.getCampaigns();
  }

  ngOnChanges(changes: any) {
    console.log('cambios: ', this.session.getUser());
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
    this.router.navigate(['company', this.user.username, 'new-campaign']);
  }

  editProfile() {
    this.router.navigate(['app', this.user.username, 'edit-profile']);
  }

  checkYoutube() {
    if(this.user.socialLinks.youtube == null || this.user.socialLinks.youtube === ''){
      this.youtubeProfile = false;
    } else {
      this.youtubeProfile = true;
    }
  }

  checkTwitter() {
    if (this.user.socialLinks.twitter == null || this.user.socialLinks.twitter === '') {
      this.twitterProfile = false;
    } else {
      this.twitterProfile = true;
    }
  }

}

