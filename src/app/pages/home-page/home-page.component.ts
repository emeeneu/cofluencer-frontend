import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {

  toggleMenu: boolean;
  toggleModal: boolean;
  optionLoginSignup: string;

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

  menuControl() {
    this.toggleMenu = !this.toggleMenu;
  }

  modalControl(option) {
    this.toggleModal = !this.toggleModal;
    if (option === 'login') {
      this.optionLoginSignup = 'login';
      this.router.navigate(['login']);
    } else if (option === 'signup') {
      this.optionLoginSignup = 'signup';
      this.router.navigate(['signup']);
    }
  }

  onCloseModal() {
    this.toggleModal = !this.toggleModal;
    this.router.navigate(['/']);
  }

}
