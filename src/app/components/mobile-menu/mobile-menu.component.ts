import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.css']
})
export class MobileMenuComponent implements OnInit {

  @Output() close = new EventEmitter<any>();
  @Output() modal = new EventEmitter<any>();

  toggleNav: boolean;

  constructor() { }

  ngOnInit() {
  }

  closeMenu() {
    this.close.emit();
  }

  modalControl(option) {
    this.toggleNav = !this.toggleNav;
    this.modal.emit(option);
  }

}
