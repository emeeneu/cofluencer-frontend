import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/toPromise';
import { AuthService } from './auth.service';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class CompanyService {

  campaigns: any = [];
  companyId: string;
  user: any;
  campaignDetail: any;

  private sub: any;
  private API_URL = 'http://localhost:3000/api';
  private newCampaign: any;

  constructor(
    private httpClient: HttpClient,
    private session: AuthService,
    private route: ActivatedRoute,
  ) { }

  campaignsList(user: any): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.get(`${this.API_URL}/campaigns`, options)
      .toPromise()
      .then((campaigns) => {
        this.campaigns = campaigns;
      })
      .catch((err) => {
        if (err.status === 404) {
          console.log(err);
        }
      });
  }

  campaign(campaignId: any): Promise<any> {
    const options = {
      withCredentials: true,
    };
    return this.httpClient.get(`${this.API_URL}/campaigns/${campaignId}`, options)
      .toPromise()
      .then((campaign) => {
        return this.campaignDetail = campaign;
      })
      .catch((err) => {
        if (err.status === 404) {
          console.log(err);
        }
      });
  }

  createCampaign(formCampaign: any): Promise<any> {
    const options = {
      withCredentials: true,
    };
    return this.httpClient.post(`${this.API_URL}/newcampaign`, formCampaign, options)
      .toPromise()
      .then((newCampaign) => this.newCampaign = newCampaign)
      .catch((err) => {
        console.log(err);
      });
  }

  updateUser(userForm: any) {
    const options = {
      withCredentials: true,
    };
    return this.httpClient.put(`${this.API_URL}/update-user`, userForm, options)
      .toPromise()
      .then((updatedUser) => {
        this.user = updatedUser;
        return this.user;
      })
      .catch((err) => {
        if (err.status === 404) {
          console.log(err);
        }
      });
  }



}
