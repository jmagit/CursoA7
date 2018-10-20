import { Component, OnInit } from '@angular/core';
import { NotifyService } from '../../app-common';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

  constructor(public srv: NotifyService) {
    srv.Notificacion.subscribe(msg => window.alert(`Suscripcion: ${msg}`));
  }

  ngOnInit() {
  }

}
