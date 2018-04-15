import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-campaign-detail',
  templateUrl: './campaign-detail.component.html',
  styleUrls: ['./campaign-detail.component.css']
})
export class CampaignDetailComponent implements OnInit {

  campaignDetail: any;
  campaignId: any;
  private sub: any;
  toggleMenu: boolean;

  constructor(
    private session: AuthService,
    private router: Router,
    private companyService: CompanyService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.campaignId = params['campaignid'];
    });
    this.companyService.campaign(this.campaignId)
      .then((campaign) => {
        this.campaignDetail = campaign;
      })
      .catch((err) => {
        console.log(err);
      });
  }

}
