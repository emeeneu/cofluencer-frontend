import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class TwtDatauserService {
  twitterUser: Object;
  userTweets: Array<any> = [];

  private API_URL = 'http://localhost:3000/api';
  constructor(private httpClient: HttpClient) { }

  getInfoTwitterUser(user): Promise<any> {
    return this.httpClient.get(`${this.API_URL}/twt/${user}`)
      .toPromise()
      .then((data: any) => {
        this.twitterUser = data.user[0]
        for(let i=0;i<3;i++){
          this.userTweets.push(data.tweets[i])
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }
}
