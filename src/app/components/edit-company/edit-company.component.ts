import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CompanyService } from '../../services/company.service';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.css']
})
export class EditCompanyComponent implements OnInit {

  private API_URL = 'http://localhost:3000/api';

  uploader: FileUploader = new FileUploader({
    url: `${this.API_URL}/upload-image`
  });
  feedback: string;

  user: any;
  editingUser = {
    username: '',
    bio: '',
  };

  constructor(
    private session: AuthService,
    private router: Router,
    private companyService: CompanyService,
  ) { }

  ngOnInit() {
    this.user = this.session.getUser();
    // this.uploader.onSuccessItem = (item, response) => {
    //   this.feedback = JSON.parse(response).message;
    // };

    // this.uploader.onErrorItem = (item, response, status, headers) => {
    //   this.feedback = JSON.parse(response).message;
    // };
  }

  updateUser() {
    this.companyService.updateUser(this.editingUser)
      .then((updatedUser) => {
        this.session.setUser(updatedUser);
        this.router.navigate(['company', updatedUser.username]);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  uploadImage(item) {
      this.uploader.uploadAll();
  }

  close() {
    this.router.navigate(['company', this.user.username]);
  }

}
