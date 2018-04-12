import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from '../../services/company.service';



@Component({
  selector: 'app-create-campaign',
  templateUrl: './create-campaign.component.html',
  styleUrls: ['./create-campaign.component.css'],
  providers: [CompanyService],
})
export class CreateCampaignComponent implements OnInit {

  constructor(
    private router: Router,
    private companyService: CompanyService,
  ) { }

  formCampaign = {
    title: '',
    description: '',
    startDate: Date,
    endDate: Date,
  };

  newCampaign: any;

  ngOnInit() {
  }

  close() {
    this.router.navigate(['company/:id']);
  }

  createCampaign() {
    this.companyService.createCampaign(this.formCampaign)
      .then(newCampaign => {
        this.newCampaign = newCampaign;
        this.router.navigate(['company/:id']);
        console.log(this.newCampaign);
      })
      .catch((error) => {
        console.log(error);
      });
  }

}
