import { Component, OnInit } from '@angular/core';
import { TwtDatauserService } from '../../services/twt-datauser.service';

@Component({
  selector: 'app-twitter-info',
  templateUrl: './twitter-info.component.html',
  styleUrls: ['./twitter-info.component.css']
})
export class TwitterInfoComponent implements OnInit {
  twitterInfo: any;
  constructor(private userTwitterInfo: TwtDatauserService) { }

  ngOnInit() {
  }

  getTwitterInfo() {
    this.userTwitterInfo.getInfoTwitterUser()
      .subscribe((twitterInfo) => this.twitterInfo = twitterInfo);
  }
}
