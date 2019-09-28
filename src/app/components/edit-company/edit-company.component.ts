import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CompanyService } from '../../services/company.service';
import { FileUploader } from 'ng2-file-upload';
import { ToasterService } from '../../services/toaster.service';
import 'rxjs/add/operator/toPromise';
import { TagInputModule } from 'ngx-chips';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.css']
})
export class EditCompanyComponent implements OnInit {

  private API_URL = 'https://api-cofluencer.herokuapp.com/api';

  uploader: FileUploader = new FileUploader({
    url: `${this.API_URL}/upload-image/profileImage/edit`,
  });
  // user: any;
  editingUser = {
    username: '',
    brandName: '',
    email: '',
    bio: '',
    city: '',
    profileImage: '',
    avatar: '',
    tags: [],
  };
  options = {
    withCredentials: true,
  };

  constructor(
    private session: AuthService,
    private router: Router,
    private companyService: CompanyService,
    private toaster: ToasterService,
  ) { }

  ngOnInit() {
    this.editingUser = this.session.getUser();
    this.uploader.onAfterAddingFile = (item => {
      this.uploadImage(item, this.options);
      this.editingUser = this.session.getUser();
    });
  }

  updateUser() {
    console.log(this.editingUser);
    this.companyService.updateUser(this.editingUser)
      .then((updatedUser) => {
        this.session.setUser(updatedUser);
        this.router.navigate(['company', updatedUser.username]);
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
    this.router.navigate(['company', this.editingUser.username]);
  }

}
