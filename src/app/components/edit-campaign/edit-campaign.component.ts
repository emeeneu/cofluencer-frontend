import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-edit-campaign',
  templateUrl: './edit-campaign.component.html',
  styleUrls: ['./edit-campaign.component.css']
})
export class EditCampaignComponent implements OnInit {

  user: any;
  campaignDetail: any = '';
  campaignId: any;
  private sub: any;
  editingCampaign: Object = {
    title: '',
    description: '',
  };

  constructor(
    private session: AuthService,
    private router: Router,
    private companyService: CompanyService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.user = this.session.getUser();
    this.campaignDetail = this.companyService.campaignDetail;
    this.sub = this.route.params.subscribe(params => {
      this.campaignId = params['campaignid'];
    });
  }

  close() {
    this.router.navigate(['company', this.user.username, this.campaignId]);
  }

  updateCampaign() {
    this.companyService.updateCampaign(this.editingCampaign, this.campaignId);
    this.router.navigate(['company', this.user.username, this.campaignId]);
  }

}
