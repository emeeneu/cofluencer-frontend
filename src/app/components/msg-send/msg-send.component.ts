import { Component, OnInit, Input } from '@angular/core';
import { MsgService } from '../../services/msg.service';

@Component({
  selector: 'app-msg-send',
  templateUrl: './msg-send.component.html',
  styleUrls: ['./msg-send.component.css']
})
export class MsgSendComponent implements OnInit {

  @Input() to: any;
  message: any;

  constructor(
    private msg: MsgService,
  ) { }

  ngOnInit() {
  }

  sendMsg() {
    this.msg.sendMsg(this.to, this.message);
    this.message = '';
  }
}
