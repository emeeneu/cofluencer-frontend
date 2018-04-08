import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() optionLoginSignup: string;
  @Output() closeModal = new EventEmitter<boolean>();

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

  onCloseModal() {
    this.closeModal.emit();
  }

  changeModal(option) {
    if (option === 'login') {
      this.optionLoginSignup = 'login';
      this.router.navigate(['login']);
    } else if (option === 'signup') {
      this.optionLoginSignup = 'signup';
      this.router.navigate(['signup']);
    }
  }


}
