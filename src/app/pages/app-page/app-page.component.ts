import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CompanyService } from '../../services/company.service';
import { ToasterService } from '../../services/toaster.service';
import { InfluencerService } from '../../services/influencer.service';

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
    private companyService: CompanyService,
    private influencer: InfluencerService,
    private toaster: ToasterService
  ) { }

  ngOnInit() {
    this.user = this.session.getUser();
    this.checkYoutube();
    this.checkTwitter();
    this.influencer.listMyCampaigns();
  }

  ngOnChanges(changes: any) {
    console.log('cambios: ', this.session.getUser());
  }

  logout() {
    this.session.logout();
    this.router.navigate(['/']);
    this.toaster.success(`${this.user.username}`, `See you! 👋🏻`);
  }

  menuControl() {
    this.toggleMenu = !this.toggleMenu;
  }

  moreButtonControl() {
    this.toggleMoreButton = !this.toggleMoreButton;
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

