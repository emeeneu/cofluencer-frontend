import { Component, OnInit } from '@angular/core';
import { YoutubeDatauserService } from '../../services/youtube-datauser.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-youtube-info',
  templateUrl: './youtube-info.component.html',
  styleUrls: ['./youtube-info.component.css']
})
export class YoutubeInfoComponent implements OnInit {
  

  youtubeInfo: any
  
  constructor(
    private userYoutubeInfo: YoutubeDatauserService,
    private sanitizer: DomSanitizer,
    private session: AuthService,
    ) { }

  ngOnInit() {
    this.userYoutubeInfo.getInfoYoutubeUser(this.session.getUser().socialLinks.youtube)
  }

  // getYoutubeInfo() {
  //   this.userYoutubeInfo.getInfoYoutubeUser()
  // }
  
  cleanURL(oldURL: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(oldURL);
  }
}
