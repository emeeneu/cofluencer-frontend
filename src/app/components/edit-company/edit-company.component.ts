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
  editingUser: Object = {
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
    this.session.updateUser(this.editingUser);
  }

}
