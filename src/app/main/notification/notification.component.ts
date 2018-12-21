import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../common-app';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  constructor(private notify: NotificationService) { }

  public get VM() { return this.notify; }

  ngOnInit() {
  }

}
