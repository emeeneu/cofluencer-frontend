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
  campaignTitle: any;
  private sub: any;

  constructor(
    private session: AuthService,
    private router: Router,
    private companyService: CompanyService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.campaignTitle = params['campaigntitle'];
    });
    console.log(this.campaignTitle);
    // this.companyService.campaign()
    //   .then((campaign) => {
    //     this.campaignDetail = campaign;
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }

}
