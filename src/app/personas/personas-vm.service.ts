import { Injectable } from '@angular/core';
import { NotifyService } from '../app-common';
import { LoggerService } from '../../indra-core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class PersonasDAOService {
  private baseUrl = environment.apiURL + 'personas';
  private options = { withCredentials: true };

  constructor(private http: HttpClient) { }
  query(): Observable<any> {
    return this.http.get(this.baseUrl, this.options);
  }
  get(id: number) {
    return this.http.get(this.baseUrl + '/' + id, this.options);
  }
  add(item: any)  {
    return this.http.post(this.baseUrl, item, this.options);
  }
  change(item: any) {
    return this.http.put(this.baseUrl, item, this.options);
  }
  remove(id: number) {
    return this.http.delete(this.baseUrl + '/' + id, this.options);
  }
}

@Injectable()
export class PersonasDAOVMService {
  private modo: 'list' | 'add' | 'edit' | 'view' | 'delete' = 'list';
  private listado: Array<any> = [];
  private elemento: any = {};
  private idOriginal = null;
  protected pk = 'id';
  protected urllist = '/personas';

  constructor(private dao: PersonasDAOService, private nsrv: NotifyService,
    private out: LoggerService, private router: Router) { }

  public get Modo() { return this.modo; }
  public get Listado() { return this.listado; }
  public get Elemento() { return this.elemento; }

  public list() {
    this.dao.query().subscribe(
      data => {
        this.listado = data;
        this.modo = 'list';
      },
      error => { this.nsrv.add(error.message); }
    );
  }

  public add() {
    this.modo = 'add';
    this.elemento = { id: 0 };
  }

  public edit(key: any) {
    this.dao.get(key).subscribe(
      data => {
        this.modo = 'edit';
        this.elemento = data;
        this.idOriginal = key;
        },
      error => { this.nsrv.add(error.message); }
    );
  }

  public view(key: any) {
    this.dao.get(key).subscribe(
      data => {
        this.modo = 'view';
        this.elemento = data;
        },
      error => { this.nsrv.add(error.message); }
    );
  }

  public remove(key: any) {
    if (!window.confirm('¿Seguro?')) { return; }
    this.dao.remove(key).subscribe(
      data => { this.list(); },
      error => { this.nsrv.add(error.message); }
    );
  }

  public cancel() {
    this.elemento = {};
    this.idOriginal = null;
    // this.list();
    this.router.navigateByUrl(this.urllist);
  }

  public send() {
    switch (this.modo) {
      case 'add':
        this.dao.add(this.elemento).subscribe(
          data => { this.cancel(); },
          error => { this.nsrv.add(error.message); }
        );
        break;
      case 'edit':
        this.dao.change(this.elemento).subscribe(
          data => { this.cancel(); },
          error => { this.nsrv.add(error.message); }
        );
        break;
      case 'view':
        this.cancel();
        break;
    }
  }

}

@Injectable()
export class PersonasVMService {
  private modo: 'list' | 'add' | 'edit' | 'view' | 'delete' = 'list';
  private listado: Array<any> = [];
  private elemento: any = {};
  private idOriginal = null;
  protected pk = 'id';

  constructor(private nsrv: NotifyService, private out: LoggerService) { }

  public get Modo() { return this.modo; }
  public get Listado() { return this.listado; }
  public get Elemento() { return this.elemento; }

  public list() {
    this.modo = 'list';
    if (this.listado.length === 0 ) {
      this.listado = [
        { id: 1, nombre: 'Carmelo', apellidos: 'Coton', edad: 34},
        { id: 2, nombre: 'Pepito', apellidos: 'Grillo', edad: 155},
        { id: 3, nombre: 'Pedro', apellidos: 'Pica Piedra', edad: 50},
        { id: 4, nombre: 'Pablo', apellidos: 'Marmol', edad: 18},
      ];
    }
  }

  public add() {
    this.modo = 'add';
    this.elemento = {};
  }

  public edit(key: any) {
    // tslint:disable-next-line:triple-equals
    const rslt = this.listado.find(item => item[this.pk] == key);
    if (rslt) {
      this.modo = 'edit';
      this.elemento = Object.assign({}, rslt);
      this.idOriginal = key;
    } else {
      this.nsrv.add('encontrado');
    }
  }

  public view(key: any) {
    // tslint:disable-next-line:triple-equals
    const rslt = this.listado.find(item => item[this.pk] == key);
    if (rslt) {
      this.modo = 'view';
      this.elemento = Object.assign({}, rslt);
    } else {
      this.nsrv.add('encontrado');
    }
  }

  public remove(key: any) {
    if (!window.confirm('¿Seguro?')) { return; }
    // tslint:disable-next-line:triple-equals
    const indice = this.listado.findIndex(item => item[this.pk] == key);
    if (indice !== -1) {
      this.listado.splice(indice, 1);
      this.list();
    } else {
      this.nsrv.add('encontrado');
    }
  }

  public cancel() {
    this.elemento = {};
    this.idOriginal = null;
    this.list();
  }

  public send() {
    switch (this.modo) {
      case 'add':
        this.listado.push(this.elemento);
        this.cancel();
        break;
      case 'edit':
          // tslint:disable-next-line:triple-equals
          const indice = this.listado.findIndex(item => item[this.pk] == this.idOriginal);
          if (indice !== -1) {
            this.listado[indice] = this.elemento;
            this.list();
          } else {
            this.nsrv.add('encontrado');
          }
          break;
      case 'view':
          this.cancel();
          break;
    }
  }

}
