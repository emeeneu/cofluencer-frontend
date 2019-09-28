import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CompanyService } from '../../services/company.service';
import { FileUploader } from 'ng2-file-upload';
import { InfluencerService } from '../../services/influencer.service';
import { ToasterService } from '../../services/toaster.service';

@Component({
  selector: 'app-edit-image-campaign',
  templateUrl: './edit-image-campaign.component.html',
  styleUrls: ['./edit-image-campaign.component.css']
})
export class EditImageCampaignComponent implements OnInit {

  private API_URL = 'https://api-cofluencer.herokuapp.com/api';
  private sub: any;
  campaignId: any;
  companyId: any;

  uploader: FileUploader;

  formCampaign: any = {
    campaignImage: '',
  };
  options = {
    withCredentials: true,
  };

  constructor(
    private session: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private companyService: CompanyService,
    private influencerService: InfluencerService,
    private toaster: ToasterService,
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.companyId = params.id;
      this.campaignId = params.campaignid;
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
    this.uploader = new FileUploader({
      url: `${this.API_URL}/upload-image/campaignImage/${this.campaignId}`,
    });
    this.uploader.onAfterAddingFile = (item => {
      this.uploadImage(item, this.options);
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

  uploadImage(item, options) {
    this.uploader.uploadAll();
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.formCampaign = JSON.parse(response);
      this.toaster.success('Campaign Image updated! 📸 ');
    };
  }

}
