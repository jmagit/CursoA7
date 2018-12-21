import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RouterModule } from '@angular/router';
import { SecurityModule } from '../security';
import { NotificationComponent } from './notification/notification.component';

@NgModule({
  imports: [
    CommonModule, RouterModule.forChild([{ path: '404.html', component: PageNotFoundComponent }]), SecurityModule,
  ],
  declarations: [ MenuComponent, PageNotFoundComponent, NotificationComponent ],
  exports: [ MenuComponent, PageNotFoundComponent, NotificationComponent ]
})
export class MainModule { }
