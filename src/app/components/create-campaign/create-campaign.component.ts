import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from '../../services/company.service';
import { AuthService } from '../../services/auth.service';
import { ToasterService } from '../../services/toaster.service';



@Component({
  selector: 'app-create-campaign',
  templateUrl: './create-campaign.component.html',
  styleUrls: ['./create-campaign.component.css'],
  providers: [CompanyService],
})
export class CreateCampaignComponent implements OnInit {

  username: any;

  constructor(
    private router: Router,
    private companyService: CompanyService,
    private session: AuthService,
    private toaster: ToasterService,
  ) { }

  formCampaign = {
    title: '',
    description: '',
    startDate: Date,
    endDate: Date,
  };

  newCampaign: any;

  ngOnInit() {
    this.username = this.session.getUser().username;
  }

  close() {
    this.router.navigate(['company', this.username]);
  }

  createCampaign() {
    this.companyService.createCampaign(this.formCampaign)
      .then(newCampaign => {
        this.newCampaign = newCampaign;
        this.router.navigate(['company', this.username]);
        this.toaster.success(`Campaign added`, `${newCampaign.title} is public now`);
        console.log(this.newCampaign);
      })
      .catch((error) => {
        console.log(error);
      });
  }

}
