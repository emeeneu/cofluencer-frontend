import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { InfluencerService } from '../../services/influencer.service';
import { CompanyService } from '../../services/company.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-influencers',
  templateUrl: './list-influencers.component.html',
  styleUrls: ['./list-influencers.component.css']
})
export class ListInfluencersComponent implements OnInit {

  constructor(
    private session: AuthService,
    private influencer: InfluencerService,
    private companyService: CompanyService,
    private router: Router
  ) { }

  ngOnInit() {
  }

}
