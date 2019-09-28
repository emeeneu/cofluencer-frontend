import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class IgDatauserService {
  instaUser: Object;

  constructor(private http: Http) { }

  getInfoInstaUser(){
    return this.http.get('https://api-cofluencer.herokuapp.com/api/ig/emeeneu')
      .map((res: Response) => res.json());
  }
}
