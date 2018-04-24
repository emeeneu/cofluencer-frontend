import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, CanActivate } from '@angular/router';


@Injectable()
export class PublicProfileService implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(): Promise<boolean> {
    return this.authService
      .me()
      .then(user => {
        console.log(user);
        if (user.role === 'influencer') {
          this.router.navigate(['company']);
        } else {
          return true;
        }
      });
  }

}
