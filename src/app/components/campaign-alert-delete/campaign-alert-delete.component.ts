import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-campaign-alert-delete',
  templateUrl: './campaign-alert-delete.component.html',
  styleUrls: ['./campaign-alert-delete.component.css']
})
export class CampaignAlertDeleteComponent implements OnInit {

  constructor(private companyService: CompanyService) { }

  ngOnInit() {
  }

}
