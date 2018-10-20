import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PopupComponent } from './popup/popup.component';
import { RouterModule } from '@angular/router';
import { SecurityModule } from '../security';

@NgModule({
  imports: [
    CommonModule, RouterModule.forChild([{ path: '404.html', component: PageNotFoundComponent }]), SecurityModule,
  ],
  declarations: [ MenuComponent, PopupComponent, PageNotFoundComponent ],
  exports: [ MenuComponent, PopupComponent, PageNotFoundComponent ]
})
export class MainModule { }
