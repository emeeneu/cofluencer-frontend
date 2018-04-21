import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.css']
})
export class EditCompanyComponent implements OnInit {

  user: any;
  editingUser = {
    username: '',
    bio: '',
  };

  constructor(
    private session: AuthService,
    private router: Router,
    private companyService: CompanyService
  ) { }

  ngOnInit() {
    this.user = this.session.getUser();
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

  close() {
    this.router.navigate(['company', this.user.username]);
  }

}
