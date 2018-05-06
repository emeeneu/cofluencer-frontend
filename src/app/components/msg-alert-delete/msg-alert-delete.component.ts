import { Component, OnInit, Input } from '@angular/core';
import { MsgService } from '../../services/msg.service';

@Component({
  selector: 'app-msg-alert-delete',
  templateUrl: './msg-alert-delete.component.html',
  styleUrls: ['./msg-alert-delete.component.css']
})
export class MsgAlertDeleteComponent implements OnInit {

  @Input() idMessage: any;

  constructor(private msg: MsgService) { }

  ngOnInit() {
    console.log(this.idMessage)
  }

}
