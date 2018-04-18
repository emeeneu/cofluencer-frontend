import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class TwtDatauserService {
  twitterUser: Object;

  constructor(private http: Http) { }

  getInfoTwitterUser() {
    return this.http.get('http://localhost:3000/api/twt/emeeneu')
      .map((res: Response) => res.json());
  }
}
