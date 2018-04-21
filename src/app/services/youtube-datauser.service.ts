import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';

@Injectable()
export class YoutubeDatauserService {
  youTubeUser: Array<any>;
  videoUser: Array<any> = [];

  private API_URL = 'http://localhost:3000/api';
  constructor(
    private httpClient: HttpClient,
    private sanitizer: DomSanitizer,
  ) { }

  getInfoYoutubeUser(yt_user): Promise<any> {
    return this.httpClient.get(`${this.API_URL}/youtube/${yt_user}`)
    .toPromise()
    .then((data: any)=>{
      this.youTubeUser = data.result.items.slice(1);
      console.log(this.youTubeUser);
      this.videoUser = [];
      this.youTubeUser.forEach((video)=>{
        const url = 'https://www.youtube.com/embed/';
        const videoId = video.id.videoId;
        const urlDone = url+videoId;
        this.videoUser.push(urlDone);
      })
      console.log(this.videoUser);
    })
    .catch((err)=>{
      console.log(err);
    })
  };

}
