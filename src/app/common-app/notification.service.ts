import { Injectable } from '@angular/core';
import { LoggerService } from 'src/indra-core';
import { Subject } from 'rxjs';

export enum NotificationType {
  error = 'error',
  warn = 'warn',
  info = 'info',
  log = 'log'
}

export class Notification {
  constructor(private id: number, private message: string,
    private type: NotificationType) {}

  public get Id() { return this.id; }
  public set Id(valor: number) { if (this.id !== valor) { this.id = valor; } }
  public get Message() { return this.message; }
  public set Message(valor: string) { this.message = valor; }
  public get Type() { return this.type; }
  public set Type(valor: NotificationType) { this.type = valor; }
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private listado: Array<Notification> = [];
  private notificacion$ = new Subject<Notification>();

  constructor(private out: LoggerService) { }

  public get Listado() { return Object.assign([], this.listado); }
  public get HayNotificaciones() { return this.listado.length > 0; }
  public get Notificacion() { return this.notificacion$; }

  public add(msg: string, type: NotificationType = NotificationType.error): void {
    if (!msg) {
      this.out.error('Falta el mansaje de notificación.');
      return;
    }
    const newId = this.HayNotificaciones ?
      this.listado[this.listado.length - 1].Id + 1 : 1;
    const n = new Notification(newId, msg, type);
    this.listado.push(n);
    this.notificacion$.next(n);
    if (type === NotificationType.error) {
      this.out.error(`NOTIFICACIÓN: ${msg}`);
    }
  }
  public remove(index: number): void {
    if (0 <= index && index < this.listado.length) {
      this.listado.splice(index, 1);
    } else {
      this.out.error('Index out of range.');
    }
  }
  public clear(): void {
    if (this.HayNotificaciones) {
      this.listado.splice(0);
    }
  }
}
