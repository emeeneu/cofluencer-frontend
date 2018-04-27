import { Component, OnInit } from '@angular/core';
import { TwtDatauserService } from '../../services/twt-datauser.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-twitter-info',
  templateUrl: './twitter-info.component.html',
  styleUrls: ['./twitter-info.component.css']
})
export class TwitterInfoComponent implements OnInit {
  twitterInfo: any;
  constructor(
    private userTwitterInfo: TwtDatauserService,
    private session: AuthService,
  ) { }

  ngOnInit() {
    this.twitterInfo = this.session.getUser().socialLinks.twitter;
    console.log(this.twitterInfo)
    if (this.twitterInfo) {
      this.userTwitterInfo.getInfoTwitterUser(this.twitterInfo);
    }
  }
}
