import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/toPromise';
import { AuthService } from './auth.service';
import { ToasterService } from '../services/toaster.service';

@Injectable()
export class InfluencerService {

  influencerId: string;
  user: any;
  stats: any = {
    registeredCampaigns: Number,
    cofluencity: Number,
  };
  campaigns: any;
  companyDetail: any = '';
  options = {
    withCredentials: true,
  };
  private API_URL = 'http://localhost:3000/api';

  constructor(
    private httpClient: HttpClient,
    private session: AuthService,
    private toaster: ToasterService
  ) { }

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

  listCampaigns(){
    this.user = this.session.getUser();
    return this.httpClient.get(`${this.API_URL}/list-campaigns`, this.options)
      .toPromise()
      .then((listCampaigns) => {
        this.campaigns = listCampaigns;
      })
      .catch((err) => {
        if (err.status === 404) {
          console.log(err);
        }
      });
  }

  listMyCampaigns() {
    this.user = this.session.getUser();
    return this.httpClient.get(`${this.API_URL}/list-my-campaigns`, this.options)
      .toPromise()
      .then((listCampaigns) => {
        this.campaigns = listCampaigns;
        this.stats.registeredCampaigns = Object.keys(listCampaigns).length;
      })
      .catch((err) => {
        if (err.status === 404) {
          console.log(err);
        }
      });
  }

  getCompany(companyParams: any) {
    const options = {
      withCredentials: true,
    };
    return this.httpClient.get(`${this.API_URL}/company/${companyParams}`, options)
      .toPromise()
      .then((theCompany) => {
        this.companyDetail = theCompany;
      })
      .catch((err) => {
        if (err.status === 404) {
          console.log(err);
        }
      });
  }

  joinCampaign(idCampaign: any) {
    return this.httpClient.put(`${this.API_URL}/campaigns/join/${idCampaign}`,{}, this.options)
      .toPromise()
      .then((res) => {
        if (window.location.pathname === '/campaigns') {
          this.listCampaigns();
        } else if (window.location.pathname === '/campaigns/me') {
          this.listMyCampaigns();
        }
        this.toaster.success(`Registered correctly, good luck! 🤙🏻`);
        console.log(res);
      })
      .catch((err) => {
        if (err.status === 404) {
          console.log(err);
        }
      });
  }

  outCampaign(idCampaign: any) {
    return this.httpClient.put(`${this.API_URL}/campaigns/out/${idCampaign}`,{}, this.options)
      .toPromise()
      .then((res) => {
        if (window.location.pathname === '/campaigns') {
          this.listCampaigns();
        } else if (window.location.pathname === '/campaigns/me') {
          this.listMyCampaigns();
        }
        this.toaster.success('Removed from this campaign 🤭');
        console.log(res);
      })
      .catch((err) => {
        if (err.status === 404) {
          console.log(err);
        }
      });
  }
}
