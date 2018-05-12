import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CompanyService } from '../../services/company.service';
import { ToasterService } from '../../services/toaster.service';

@Component({
  selector: 'app-campaign-detail',
  templateUrl: './campaign-detail.component.html',
  styleUrls: ['./campaign-detail.component.css']
})
export class CampaignDetailComponent implements OnInit {

  user: any;
  campaignId: any;
  private sub: any;
  toggleMenu: boolean;

  constructor(
    private session: AuthService,
    private router: Router,
    private companyService: CompanyService,
    private route: ActivatedRoute,
    private toaster: ToasterService,
  ) { }

  ngOnInit() {
    this.user = this.session.getUser();
    this.sub = this.route.params.subscribe(params => {
      this.campaignId = params['campaignid'];
    });
    this.companyService.campaign(this.campaignId);
  }

  editCampaign() {
    this.router.navigate(['company', this.user.username, this.campaignId, 'edit']);
  }

  deleteCampaign() {
    // this.companyService.deleteCampaign(this.campaignId);
    this.router.navigate(['company', this.user.username]);
    this.toaster.success(`Your campaign ${this.companyService.campaignDetail.title} has been removed correctly.`);
  }

}
