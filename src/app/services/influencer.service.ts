import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/toPromise';
import { AuthService } from './auth.service';
import { ToasterService } from '../services/toaster.service';
import { MsgService } from './msg.service';

@Injectable()
export class InfluencerService {

  companyId: string;
  user: any;
  stats: any = {
    registeredCampaigns: Number,
    cofluencity: Number,
  };
  campaigns: any;
  companyDetail: any = {
    username: String,
    coverImage: String,
    followers: Array,
  };
  companyCampaigns: any = '';
  followButtonState: boolean;
  options = {
    withCredentials: true,
  };
  private API_URL = 'http://localhost:3000/api';

  constructor(
    private httpClient: HttpClient,
    private session: AuthService,
    private toaster: ToasterService,
    private msg: MsgService,
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

  listCampaigns() {
    this.user = this.session.getUser();
    return this.httpClient.get(`${this.API_URL}/list-campaigns`, this.options)
      .toPromise()
      .then((listCampaigns: any) => {
        this.campaigns = listCampaigns.reverse();
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
    return this.httpClient.get(`${this.API_URL}/company/${companyParams}`, this.options)
      .toPromise()
      .then((theCompany) => {
        this.companyDetail = theCompany;
        return this.httpClient.get(`${this.API_URL}/campaigns/${this.companyDetail.username}`, this.options)
          .toPromise()
          .then((campaigns) => {
            this.companyCampaigns = campaigns;
          })
          .catch((err) => {
            if (err.status === 404) {
              console.log(err);
            }
          });
      })
      .catch((err) => {
        if (err.status === 404) {
          console.log(err);
        }
      });
  }

  joinCampaign(idCampaign: any) {
    return this.httpClient.put(`${this.API_URL}/campaigns/join/${idCampaign}`, {}, this.options)
      .toPromise()
      .then((res: any) => {
        if (window.location.pathname === '/campaigns') {
          this.listCampaigns();
        } else if (window.location.pathname === '/campaigns/me') {
          this.listMyCampaigns();
        } else if (window.location.pathname === `/company/${this.companyDetail.username}`) {
          this.getCompany(this.companyDetail.username);
        }
        this.msg.sendNoti(res.company_id, `Cofluencer ${this.user.name} is interested in your campaign ${res.title}!`);
        this.toaster.success(`Registered correctly, good luck! 🤙🏻`);
      })
      .catch((err) => {
        if (err.status === 404) {
          console.log(err);
        }
      });
  }

  outCampaign(idCampaign: any) {
    return this.httpClient.put(`${this.API_URL}/campaigns/out/${idCampaign}`, {}, this.options)
      .toPromise()
      .then((res) => {
        if (window.location.pathname === '/campaigns') {
          this.listCampaigns();
        } else if (window.location.pathname === '/campaigns/me') {
          this.listMyCampaigns();
        } else if (window.location.pathname === `/company/${this.companyDetail.username}`) {
          this.getCompany(this.companyDetail.username);
        } 
        this.toaster.success('Removed from this campaign 🤭');
      })
      .catch((err) => {
        if (err.status === 404) {
          console.log(err);
        }
      });
  }

  followCompany(companyId: any) {
    const options = {
      withCredentials: true,
    };
    return this.httpClient.put(`${this.API_URL}/follow/${companyId}`, {}, options)
      .toPromise()
      .then(() => {
        this.checkFollowButton();
        this.getCompany(this.companyDetail.username);
        this.msg.sendNoti(companyId, `${this.user.name} has started to follow you!`)
      })
      .catch((err) => {
        if (err.status === 404) {
          console.log(err);
        }
      });
  }

  unfollowCompany(companyId: any) {
    const options = {
      withCredentials: true,
    };
    return this.httpClient.put(`${this.API_URL}/unfollow/${companyId}`, {}, options)
      .toPromise()
      .then(() => {
        this.getCompany(this.companyDetail.username);
        this.checkFollowButton();
      })
      .catch((err) => {
        if (err.status === 404) {
          console.log(err);
        }
      });
  }

  checkFollowButton() {
    const options = {
      withCredentials: true,
    };
    return this.httpClient.get(`${this.API_URL}/user/me`, options)
      .toPromise()
      .then((user: any) => {
        this.user = user;
        if (user.companiesFavs.indexOf(this.companyDetail._id) === -1) {
          this.followButtonState = false;
        } else {
          this.followButtonState = true;
        }
      })
      .catch((err) => {
        if (err.status === 404) {
          console.log(err);
        }
      });
  }
}
