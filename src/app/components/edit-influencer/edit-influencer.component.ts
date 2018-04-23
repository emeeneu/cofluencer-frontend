import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { InfluencerService } from '../../services/influencer.service';

@Component({
  selector: 'app-edit-influencer',
  templateUrl: './edit-influencer.component.html',
  styleUrls: ['./edit-influencer.component.css']
})
export class EditInfluencerComponent implements OnInit {

  user: any;
  editingUser: any = {
    username: '',
    email: '',
    bio: '',
    socialLinks: {
      youtube: '',
      twitter: '',
    },
  };

  constructor(
    private session: AuthService,
    private router: Router,
    private influencerService: InfluencerService
  ) { }

  ngOnInit() {
    this.editingUser = this.session.getUser();
    console.log(this.editingUser);
  }

  updateUser() {
    console.log(this.editingUser);
    this.influencerService.updateUser(this.editingUser)
      .then((updatedUser) => {
        this.session.setUser(updatedUser);
        this.router.navigate(['app', updatedUser.username]);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  close() {
    this.router.navigate(['app', this.editingUser.username]);
  }

}