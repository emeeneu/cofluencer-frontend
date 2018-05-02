import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { InfluencerService } from '../../services/influencer.service';
import { Router } from '@angular/router';
import { CompanyService } from '../../services/company.service';
import { ToasterService } from '../../services/toaster.service';
import { MsgService } from '../../services/msg.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  user: any;
  toggleMenu: Boolean;
  constructor(
    private influencer: InfluencerService,
    private session: AuthService,
    private router: Router,
    private companyService: CompanyService,
    private toaster: ToasterService,
    private msg: MsgService,
  ) { }

  ngOnInit() {
    this.user = this.session.getUser();
    this.msg.checkNotifications();
    this.msg.getMessagesUser();
  }

  logout() {
    this.session.logout();
    this.router.navigate(['/']);
    this.toaster.success(`${this.user.username}`, `See you! 👋🏻`);
  }

  menuControl() {
    this.toggleMenu = !this.toggleMenu;
  }

}
