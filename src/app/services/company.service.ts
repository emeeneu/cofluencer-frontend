import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CompanyService {

  private API_URL = 'http://localhost:3000/api';
  private newCampaign: any;

  constructor(
    private httpClient: HttpClient,
  ) { }

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



}
