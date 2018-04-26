import { Component, OnInit } from '@angular/core';
import { InfluencerService } from '../../services/influencer.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CompanyService } from '../../services/company.service';
import { ToasterService } from '../../services/toaster.service';

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.css']
})
export class CampaignsComponent implements OnInit {
  user: any;
  toggleMenu: Boolean;
  toggleMoreButton: Boolean;
  campaigns: any;

  constructor(
    private influencer: InfluencerService,
    private session: AuthService,
    private router: Router,
    private companyService: CompanyService,
    private toaster: ToasterService
  ) { }

  ngOnInit() {
    this.user = this.session.getUser();
    this.campaigns = this.influencer.listCampaigns();
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

  companyDetail(company) {
    this.router.navigate(['company', company]);
  }

  campaignDetail(campaignId) {
    // necesito el companyName y el companyId
    this.router.navigate(['company', this.user.username, campaignId]);
  }

  checkJoinCampaign(influencers){
    if (influencers.filter(x => x._id === this.user._id).length === 0) {
      return true;
    } else {
      return false;
    }
  }
}
