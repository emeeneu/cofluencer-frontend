import { Component, OnInit } from '@angular/core';
import { YoutubeDatauserService } from '../../services/youtube-datauser.service';

@Component({
  selector: 'app-youtube-info',
  templateUrl: './youtube-info.component.html',
  styleUrls: ['./youtube-info.component.css']
})
export class YoutubeInfoComponent implements OnInit {
  youtubeInfo: any
  constructor(private userYoutubeInfo: YoutubeDatauserService) { }

  ngOnInit() {
  }

  getYoutubeInfo() {
    this.userYoutubeInfo.getInfoYoutubeUser()
  }
}
