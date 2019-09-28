import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { InfluencerService } from '../../services/influencer.service';
import { ToasterService } from '../../services/toaster.service';
import { FileUploader } from 'ng2-file-upload';
import { TagInputModule } from 'ngx-chips';

@Component({
  selector: 'app-edit-influencer',
  templateUrl: './edit-influencer.component.html',
  styleUrls: ['./edit-influencer.component.css']
})
export class EditInfluencerComponent implements OnInit {

  private API_URL = 'https://api-cofluencer.herokuapp.com/api';

  user: any;
  editingUser: any = {
    username: '',
    email: '',
    name: '',
    bio: '',
    socialLinks: {
      youtube: '',
      twitter: '',
    },
    profileImage: '',
    coverImage: '',
    tags: [],
  };
  uploader: FileUploader = new FileUploader({
    url: `${this.API_URL}/upload-image/profileImage/edit`,
  });
  feedback: string;
  options = {
    withCredentials: true,
  };


  constructor(
    private session: AuthService,
    private router: Router,
    private influencerService: InfluencerService,
    private toaster: ToasterService,
  ) { }

  ngOnInit() {
    this.editingUser = this.session.getUser();
    this.uploader.onAfterAddingFile = (item) => {
      this.uploadImage(item, this.options);
      this.editingUser = this.session.getUser();
    };
  }

  updateUser() {
    this.influencerService.updateUser(this.editingUser)
      .then((updatedUser) => {
        this.session.setUser(updatedUser);
        this.router.navigate(['influencer', updatedUser.username]);
        this.toaster.success('your profile is updated! 👍');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  uploadImage(item, options) {
    this.uploader.uploadAll();
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.editingUser = JSON.parse(response);
      this.toaster.success('Image updated! 📸 ');
    };
  }

  close() {
    this.router.navigate(['influencer', this.editingUser.username]);
  }

}