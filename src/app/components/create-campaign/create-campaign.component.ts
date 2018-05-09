import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from '../../services/company.service';
import { AuthService } from '../../services/auth.service';
import { ToasterService } from '../../services/toaster.service';
import { TagInputModule } from 'ngx-chips';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-create-campaign',
  templateUrl: './create-campaign.component.html',
  styleUrls: ['./create-campaign.component.css'],
  providers: [CompanyService],
})
export class CreateCampaignComponent implements OnInit {

  private API_URL = 'http://localhost:3000/api';

  uploader: FileUploader = new FileUploader({
    url: `${this.API_URL}/newCampaign`,
  });

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
    tags: [],
    startDate: Date,
    endDate: Date,
    campaignImage: '',
  };
  options = {
    withCredentials: true,
  };

  newCampaign: any;

  ngOnInit() {
    this.username = this.session.getUser().username;
  }

  close() {
    this.router.navigate(['company', this.username]);
  }

  // createCampaign() {
  //   this.companyService.createCampaign(this.formCampaign)
  //     .then(newCampaign => {
  //       this.newCampaign = newCampaign;
  //       this.router.navigate(['company', this.username]);
  //       this.toaster.success(`Campaign added`, `${newCampaign.title} is public now`);
  //       console.log(this.newCampaign);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }

  // uploadImage(item, options) {
  //   this.uploader.uploadAll();
  //   this.uploader.onCompleteItem = (iten: any, response: any, status: any, headers: any) => {
  //     this.formCampaign.campaignImage = JSON.parse(response).campaignImage;
  //   };
  // }

  createCampaign() {
    this.uploader.onBuildItemForm = (item, form) => {
      console.log(this.formCampaign.startDate);
      form.append('title', this.formCampaign.title);
      form.append('description', this.formCampaign.description);
      form.append('tags', JSON.stringify(this.formCampaign.tags));
      form.append('startDate', this.formCampaign.startDate);
      form.append('endDate', this.formCampaign.endDate);
    };

    this.uploader.uploadAll();
    this.router.navigate(['company', this.username]);
    this.toaster.success(`Campaign added`, `${this.formCampaign.title} is public now`);
  }

}
