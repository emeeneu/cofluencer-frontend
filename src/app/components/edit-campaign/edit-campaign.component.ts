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
  campaignId: any;
  company: any;
  private sub: any;
  formCampaign: any = {
    title: '',
    tags: [],
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
    this.sub = this.route.params.subscribe(params => {
      this.campaignId = params.campaignid;
      this.company = params.id;
      this.companyService.campaign(this.campaignId)
        .then((campaign) => {
          this.formCampaign = campaign;
        })
        .catch((err) => {
          if (err) {
            console.log(err);
          }
        });
    });
  }

  close() {
    this.router.navigate(['company', this.user.username]);
  }

  updateCampaign() {
    this.companyService.updateCampaign(this.formCampaign, this.campaignId);
    this.router.navigate(['company', this.user.username]);
  }

}
