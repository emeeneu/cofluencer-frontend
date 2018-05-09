import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/toPromise';
import { AuthService } from './auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from './toaster.service';
import { MsgService } from './msg.service';
import { YoutubeDatauserService } from './youtube-datauser.service';
import { TwitterInfoComponent } from '../components/twitter-info/twitter-info.component';
import { TwtDatauserService } from './twt-datauser.service';

@Injectable()
export class CompanyService {

  campaigns: any = [];
  updatedCampaign: any;
  companyId: string;
  influencer: any = {
    username: String,
    coverImage: String,
    followers: Array,
    socialLinks: {
      youtube: String,
    } 
  };
  user: any = {
    username: String,
    coverImage: String,
    followers: Array,
  };
  campaignDetail: any;
  campaignSelected: any;
  followButtonState: boolean;
  cofluencersSelected: any = [];

  private sub: any;
  private API_URL = 'http://localhost:3000/api';
  private newCampaign: any;

  constructor(
    private httpClient: HttpClient,
    private session: AuthService,
    private route: ActivatedRoute,
    private toaster: ToasterService,
    private msg: MsgService,
    private router: Router,
    private youtubeInfo: YoutubeDatauserService,
    private twitterInfo: TwtDatauserService,
  ) { }

  campaignsList(): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.get(`${this.API_URL}/campaigns`, options)
      .toPromise()
      .then((campaigns: any) => {
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
    return this.httpClient.get(`${this.API_URL}/campaigns/edit/${campaignId}`, options)
      .toPromise()
      .then((campaign) => {
        return campaign;
      })
      .catch((err) => {
        if (err.status === 404) {
          console.log(err);
        }
      });
  }

  campaignByCompany(companyName: any): Promise<any> {
    const options = {
      withCredentials: true,
    };
    return this.httpClient.get(`${this.API_URL}/campaigns/${companyName}`, options)
      .toPromise()
      .then((campaigns: any) => {
        this.campaigns = campaigns;
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

  updateUser(userForm: any): Promise<any> {
    const options = {
      withCredentials: true,
    };
    console.log(userForm);
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

  updateCampaign(campaignForm: any, campaignId: any) {
    const options = {
      withCredentials: true,
    };
    return this.httpClient.put(`${this.API_URL}/${campaignId}/update-campaign`, campaignForm, options)
      .toPromise()
      .then((updatedCampaign) => {
        this.updatedCampaign = updatedCampaign;
        return this.updatedCampaign;
      })
      .catch((err) => {
        if (err.status === 404) {
          console.log(err);
        }
      });
  }

  selectCampaign(campaignId) {
    this.campaignSelected = campaignId;
  }

  deleteCampaign() {
    console.log('deleteeeee: ', this.campaignSelected);
    const options = {
      withCredentials: true,
    };
    return this.httpClient.delete(`${this.API_URL}/${this.campaignSelected}/delete-campaign`, options)
      .toPromise()
      .then((deletedCampaign) => {
        this.toaster.success('Campaign has been successfully deleted! 🤙🏻');
        this.campaignsList();
        this.router.navigate(['company', this.user.username]);
      })
      .catch((err) => {
        if (err.status === 404) {
          console.log(err);
        }
      });
  }

  getCompany(companyId: any): Promise<any> {
    const options = {
      withCredentials: true,
    };
    return this.httpClient.get(`${this.API_URL}/company/${companyId}`, options)
      .toPromise()
      .then((companyDB) => {
        return companyDB;
      })
      .catch((err) => {
        if (err.status === 404) {
          console.log(err);
        }
      });
  }

  getInfluencer(influencer: any): Promise<any> {
    const options = {
      withCredentials: true,
    };
    return this.httpClient.get(`${this.API_URL}/company/${influencer}`, options)
      .toPromise()
      .then((influencerDB: any) => {
        this.influencer = influencerDB;
        if (influencerDB.socialLinks.youtube === null || influencerDB.socialLinks.youtube === ''){
          console.log('notiene')
        } else {
          this.youtubeInfo.getInfoYoutubeUser(influencerDB.socialLinks.youtube);
        }
        this.twitterInfo.getInfoTwitterUser(influencerDB.socialLinks.twitter);
      })
      .catch((err) => {
        if (err.status === 404) {
          console.log(err);
        }
      });
  }

  followInfluencer(influencerId: any) {
    const options = {
      withCredentials: true,
    };
    return this.httpClient.put(`${this.API_URL}/follow/${influencerId}`, {}, options)
      .toPromise()
      .then(() => {
        this.checkFollowButton();
        this.getInfluencer(this.influencer.username);
        this.msg.sendNoti(influencerId, `${this.user.brandName} has started to follow you!`);
      })
      .catch((err) => {
        if (err.status === 404) {
          console.log(err);
        }
      });
  }

  unfollowInfluencer(influencerId: any) {
    const options = {
      withCredentials: true,
    };
    return this.httpClient.put(`${this.API_URL}/unfollow/${influencerId}`, {}, options)
      .toPromise()
      .then(() => {
        this.getInfluencer(this.influencer.username);
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
        if (user.influencersFavs.indexOf(this.influencer._id) === -1) {
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

  addCofluencer(cofluencer) {
    this.cofluencersSelected.push(cofluencer);
  }

  removeCofluencer(cofluencer) {
    const cofluencerIndex = this.cofluencersSelected.indexOf(cofluencer);
    if (cofluencerIndex > -1) {
      this.cofluencersSelected.splice(cofluencerIndex, 1);
    }
  }

  saveCofluencers(cofluencersSelected) {
    console.log(this.cofluencersSelected);
    const options = {
      withCredentials: true,
    };
    this.cofluencersSelected.forEach(cofluencer => {
      return this.httpClient.put(`${this.API_URL}/campaigns/save-cofluencers`,
      {
        cofluencerId: cofluencer,
        campaignId: this.campaignSelected,
      }, options)
        .toPromise()
        .then((cofluencers) => {
          console.log(cofluencers);
        })
        .catch((err) => {
          if (err.status === 404) {
            console.log(err);
          }
        });
    });
  }

}
