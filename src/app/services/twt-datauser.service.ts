import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { ToasterService } from '../services/toaster.service';

@Injectable()
export class TwtDatauserService {
  twitterUser: Object = {
    profile_image_url: '',
  };
  userTweets: Array<any> = [];
  options = {
    withCredentials: true,
  };

  private API_URL = 'http://localhost:3000/api';
  constructor(
    private httpClient: HttpClient,
    private toaster: ToasterService,
  ) { }

  getInfoTwitterUser(user): Promise<any> {
    return this.httpClient.get(`${this.API_URL}/twt/${user}`)
      .toPromise()
      .then((data: any) => {
        this.twitterUser = data.user[0];
        this.userTweets = [];
        for(let i=0;i<3;i++){
          this.userTweets.push(data.tweets[i])
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  addAccount(username) {
    return this.httpClient.put(`${this.API_URL}/twt/add-account`, { username: username }, this.options)
      .toPromise()
      .then((res) => {
        this.toaster.success(`Your account has been added correctly! 😎`);
      })
      .catch((error) => {
        this.toaster.error(`Your account could not be updated... 🤨`);
        console.log(error);
      })
  }
}
