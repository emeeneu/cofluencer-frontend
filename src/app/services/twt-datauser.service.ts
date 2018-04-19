import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class TwtDatauserService {
  twitterUser: Object;
  userTweets: Array<any>;

  private API_URL = 'http://localhost:3000/api';
  constructor(private httpClient: HttpClient) { }

  getInfoTwitterUser(): Promise<any> {
    return this.httpClient.get(`${this.API_URL}/twt/emeeneu`)
      .toPromise()
      .then((data) => {
        this.twitterUser = data.user[0];
        this.userTweets = data.tweets;
      })
      .catch((err) => {
        console.log(err);
      })
  }
}
