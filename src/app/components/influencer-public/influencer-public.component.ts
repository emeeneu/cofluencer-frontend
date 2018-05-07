import { Component, OnInit, OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CompanyService } from '../../services/company.service';
import { ToasterService } from '../../services/toaster.service';
import { InfluencerService } from '../../services/influencer.service';
import { MsgService } from '../../services/msg.service';

@Component({
  selector: 'app-influencer-public',
  templateUrl: './influencer-public.component.html',
  styleUrls: ['./influencer-public.component.css']
})
export class InfluencerPublicComponent implements OnInit {

  user: any;
  toggleMenu: boolean;
  toggleMoreButton: boolean;
  youtubeProfile: boolean;
  twitterProfile: boolean;
  influencerUser: any;
  influencerParams: any;
  private sub: any;

  constructor(
    private session: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private companyService: CompanyService,
    private influencer: InfluencerService,
    private toaster: ToasterService,
    private msg: MsgService,
  ) { }

  ngOnInit() {
    this.user = this.session.getUser();
    this.sub = this.route.params.subscribe(params => {
      this.influencerParams = params['id'];
    });
    this.companyService.getInfluencer(this.influencerParams);
    this.companyService.checkFollowButton();
    this.checkYoutube();
    this.checkTwitter();
    this.influencer.listMyCampaigns();
    this.msg.checkNotifications();
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
    this.router.navigate(['company', this.user.username, 'edit-profile']);
  }

  checkYoutube() {
    if (this.user.socialLinks.youtube == null || this.user.socialLinks.youtube === '') {
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
