import { Component, OnInit } from '@angular/core';
import { IgDatauserService } from '../../services/ig-datauser.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-instagram-info',
  templateUrl: './instagram-info.component.html',
  styleUrls: ['./instagram-info.component.css']
})
export class InstagramInfoComponent implements OnInit {

  user: any;
  rolControl: Boolean = false;
  instaInfo: any;
  constructor(
    private userInstaInfo: IgDatauserService,
    private session: AuthService,
  ) { }

  ngOnInit() {
    this.user = this.session.getUser();
    this.user.role === 'influencer' ? this.rolControl = true : this.rolControl = false;
  }

  getInstaInfo() {
    this.userInstaInfo.getInfoInstaUser()
      .subscribe((instaInfo) => this.instaInfo = instaInfo);
  }
}
