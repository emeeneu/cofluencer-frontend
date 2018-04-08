import { Component, OnInit } from '@angular/core';
import { IgDatauserService } from '../../services/ig-datauser.service';


@Component({
  selector: 'app-instagram-info',
  templateUrl: './instagram-info.component.html',
  styleUrls: ['./instagram-info.component.css']
})
export class InstagramInfoComponent implements OnInit {

  instaInfo: any;
  constructor(private userInstaInfo: IgDatauserService) { }

  ngOnInit() {
  }
  
  getInstaInfo() {
    this.userInstaInfo.getInfoInstaUser()
      .subscribe((instaInfo) => this.instaInfo = instaInfo);
  }
}
