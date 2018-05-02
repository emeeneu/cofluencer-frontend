import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import { AuthService } from './auth.service';
import { ToasterService } from '../services/toaster.service';

@Injectable()
export class MsgService {

  msgNoRead: any = 0;
  messages: any;

  options = {
    withCredentials: true,
  };
  private API_URL = 'http://localhost:3000/api';

  constructor(
    private httpClient: HttpClient,
    private session: AuthService,
    private toaster: ToasterService
  ) { }

  sendMsg(to, message){
    console.log(to, message);
    const messageContent = {
      to: to._id,
      message: message,
    }
    return this.httpClient.post(`${this.API_URL}/send-msg`, messageContent, this.options)
      .toPromise()
      .then((res) => {
        this.toaster.success(`Your message has been sent correctly! 🚀`);
      })
      .catch((err) => {
        this.toaster.error(`Your message could not be sent... 🆘`);
        if (err.status === 404) {
          console.log(err);
        }
      })
  };

  checkNotifications() {
    return this.httpClient.get(`${this.API_URL}/user/me`, this.options)
      .toPromise()
      .then((updatedUser: any) => {
        this.msgNoRead = 0;
        updatedUser.messages.forEach(msg => {
          if(msg.read === false){
            this.msgNoRead++;
          }
        });
      })
      .catch((err) => {
        if (err.status === 404) {
          console.log(err);
        }
      })
  };

  getMessagesUser() {
    return this.httpClient.get(`${this.API_URL}/messages/me`, this.options)
      .toPromise()
      .then((messagesUser: any) => {
        this.messages = messagesUser;
        console.log(this.messages);
      })
      .catch((err) => {
        if (err.status === 404) {
          console.log(err);
        }
      })
  }
}
