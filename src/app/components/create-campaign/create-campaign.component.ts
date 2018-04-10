import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-campaign',
  templateUrl: './create-campaign.component.html',
  styleUrls: ['./create-campaign.component.css']
})
export class CreateCampaignComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  formCampaign = {
    title: '',
    description: '',
    startDate: Date,
    endDate: Date,
  };

  ngOnInit() {
  }

  close() {
    this.router.navigate(['company']);
  }

}
