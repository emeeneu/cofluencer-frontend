import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/toPromise';
import { AuthService } from './auth.service';

@Injectable()
export class InfluencerService {

  influencerId: string;
  user: any;
  campaigns: any;

  private API_URL = 'http://localhost:3000/api';

  constructor(
    private httpClient: HttpClient,
    private session: AuthService,
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
    const options = {
      withCredentials: true,
    };
    return this.httpClient.get(`${this.API_URL}/list-campaigns`, options)
      .toPromise()
      .then((listCampaigns) => {
        this.campaigns = listCampaigns;
        // return this.campaigns;
      })
      .catch((err) => {
        if (err.status === 404) {
          console.log(err);
        }
      });
  }

  joinCampaign(){
    console.log('hola')
  }
}