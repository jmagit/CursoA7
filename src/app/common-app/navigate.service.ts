import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NavigateService {
  private history = [];
  private isBack = false;

  constructor(private router: Router) {
    router.events
      .pipe(filter(e => e instanceof NavigationStart))
      .subscribe(e => {
        if (this.history.length > 10) {
          this.history.splice(0, 1);
        }
        if (this.isBack) {
          this.isBack = false;
        } else {
          this.history.push(this.router.url);
        }
      });
  }
  goBack() {
    if (this.history.length > 0) {
      const last = this.history[this.history.length - 1];
      this.history.splice(this.history.length - 1, 1);
      this.isBack = true;
      this.router.navigateByUrl(last);
    }
  }
}
