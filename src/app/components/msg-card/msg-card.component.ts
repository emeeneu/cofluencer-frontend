import { Component, OnInit, Input } from '@angular/core';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { MsgService } from '../../services/msg.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-msg-card',
  templateUrl: './msg-card.component.html',
  styleUrls: ['./msg-card.component.css']
})
export class MsgCardComponent implements OnInit {

  user: any;
  @Input() message : any;

  constructor(
    private session: AuthService,
    private msg: MsgService,
  ) { }

  ngOnInit() {
    this.user = this.session.getUser();
  }

}
