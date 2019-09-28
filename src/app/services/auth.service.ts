import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {

  private user: any;
  private userChange: Subject<any> = new Subject();

  private API_URL = 'https://api-cofluencer.herokuapp.com/auth';

  userChange$: Observable<any> = this.userChange.asObservable();

  constructor(private httpClient: HttpClient) { }

  setUser(user?: any) {
    this.user = user;
    this.userChange.next(user);
    return user;
  }

  me(): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.get(`${this.API_URL}/me`, options)
      .toPromise()
      .then((user) => this.setUser(user))
      .catch((err) => {
        if (err.status === 404) {
          this.setUser();
        }
      });
  }

  loginCompany(user: any): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.post(`${this.API_URL}/login/company`, user, options)
      .toPromise()
      .then((data) => this.setUser(data));
  }

  loginInfluencer(user: any): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.post(`${this.API_URL}/login/influencer`, user, options)
      .toPromise()
      .then((data) => this.setUser(data));
  }

  signupBrand(user: any): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.post(`${this.API_URL}/brand/signup`, user, options)
      .toPromise()
      .then((data) => this.setUser(data));
  }

  signupInfluencer(user: any): Promise<any> {
    const options = {
      withCredentials: true,
    };
    return this.httpClient.post(`${this.API_URL}/influencer/signup`, user, options)
      .toPromise()
      .then((data) => this.setUser(data));
  }

  logout(): Promise<any> {
    const options = {
      withCredentials: true
    };
    return this.httpClient.post(`${this.API_URL}/logout`, {}, options)
      .toPromise()
      .then(() => this.setUser());
  }

  getUser(): any {
    return this.user;
  }

  private(): any {
    const options = {
      withCredentials: true
    };
    return this.httpClient.get(`${this.API_URL}/private`, options)
      .toPromise();
  }

}
