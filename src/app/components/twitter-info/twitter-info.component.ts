import { Component, OnInit } from '@angular/core';
import { TwtDatauserService } from '../../services/twt-datauser.service';
import { AuthService } from '../../services/auth.service';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-twitter-info',
  templateUrl: './twitter-info.component.html',
  styleUrls: ['./twitter-info.component.css']
})
export class TwitterInfoComponent implements OnInit {

  user: any;
  rolControl: Boolean = false;
  twitterInfo: any;
  accountInput: Boolean = false;
  accountAddUsername: any = '';

  constructor(
    private userTwitterInfo: TwtDatauserService,
    private session: AuthService,
    private companyService: CompanyService,
  ) { }

  ngOnInit() {
    this.user = this.session.getUser();
    this.user.role === 'influencer' ? this.rolControl = true : this.rolControl = false;
    if (this.rolControl) {
      this.twitterInfo = this.session.getUser().socialLinks.twitter;
    } else if (!this.rolControl) {
      this.twitterInfo = this.companyService.influencer.socialLinks.twitter;
    }
    if (this.twitterInfo) {
      this.userTwitterInfo.getInfoTwitterUser(this.twitterInfo);
    }
  }

  toggleAccount() {
    this.accountInput = !this.accountInput;
  }

  saveAccount() {
    this.userTwitterInfo.getInfoTwitterUser(this.accountAddUsername)
      .then((res) => {
        if (res !== 'err') {
          this.userTwitterInfo.addAccount(this.accountAddUsername);
          this.twitterInfo = this.accountAddUsername;
        } else {
          this.toggleAccount();
        }
      })
  }
}
