import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CompanyService } from '../../services/company.service';
import { FileUploader } from 'ng2-file-upload';
import { InfluencerService } from '../../services/influencer.service';
import { ToasterService } from '../../services/toaster.service';

@Component({
  selector: 'app-edit-image-cover',
  templateUrl: './edit-image-cover.component.html',
  styleUrls: ['./edit-image-cover.component.css']
})
export class EditImageCoverComponent implements OnInit {

  private API_URL = 'http://localhost:3000/api';

  uploader: FileUploader = new FileUploader({
    url: `${this.API_URL}/upload-image/:coverImage`,
  });
  // user: any;
  editingUser = {
    profileImage: '',
    coverImage: '',
  };
  options = {
    withCredentials: true,
  };

  constructor(
    private session: AuthService,
    private router: Router,
    private companyService: CompanyService,
    private influencerService: InfluencerService,
    private toaster: ToasterService,
  ) { }

  ngOnInit() {
    this.editingUser = this.session.getUser();
    this.uploader.onAfterAddingFile = (item => {
      this.uploadImage(item, this.options);
      this.editingUser = this.session.getUser();
    });
  }

  uploadImage(item, options) {
    this.uploader.uploadAll();
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.editingUser = JSON.parse(response);
      this.toaster.success('Cover Image updated! 📸 ');
    };
  }

}
