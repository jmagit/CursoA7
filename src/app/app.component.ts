import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute, ActivationStart } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { NotificationService } from './common-app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

  constructor(private notify: NotificationService, private router: Router, private title: Title) {
    // this.notify.Notificacion.subscribe(n => {
    //   window.alert(`Suscripcion: ${n.Message}`);
    //   this.notify.remove(0);
    // });
  }

  ngOnInit(): void {
    this.router.events.subscribe(ev => {
      if (ev instanceof ActivationStart) {
        if ((ev as ActivationStart).snapshot.data && (ev as ActivationStart).snapshot.data.pageTitle) {
          this.title.setTitle((ev as ActivationStart).snapshot.data.pageTitle);
        } else {
          this.title.setTitle('Curso de Angular');
        }
      }
    });
  }

}
