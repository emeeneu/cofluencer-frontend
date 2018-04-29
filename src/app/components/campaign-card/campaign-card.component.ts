import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { InfluencerService } from '../../services/influencer.service';

@Component({
  selector: 'app-campaign-card',
  templateUrl: './campaign-card.component.html',
  styleUrls: ['./campaign-card.component.css']
})
export class CampaignCardComponent implements OnInit {
  user: any;
  rolControl: Boolean;
  dropdownControl: Boolean = false;

  @Input() campaign: any;

  constructor(
    private session: AuthService,
    private influencer: InfluencerService,
  ) { }

  ngOnInit() {
    this.user = this.session.getUser();
    this.user.role === 'company' ? this.rolControl = true : this.rolControl = false;
  }

  checkJoinCampaign(influencers) {
    if (influencers.filter(x => x._id === this.user._id).length === 0) {
      return true;
    } else {
      return false;
    }
  }

  ddControl() {
    this.dropdownControl = !this.dropdownControl;
  } 
}
