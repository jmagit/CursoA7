import { Component, OnInit } from '@angular/core';
import { LoggerService, ElipsisPipe } from '../../indra-core';
import { NotifyService } from '../app-common';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.less']
})
export class DemoComponent implements OnInit {
  // tslint:disable-next-line:no-inferrable-types
  nombre: string = 'mundo';
  resultado: string;
  listado = [
    {id: 1, nombre: 'Madrid'},
    {id: 2, nombre: 'málaga'},
    {id: 3, nombre: 'BARCELONA'},
    {id: 4, nombre: 'valencia'},
  ];
  idProvincia = 2;
  visible = true;
  conEstilo = { error: false, importante: true, destacar: false };
  font = 24;

  constructor(private out: LoggerService, private nsrv: NotifyService) { }

  get Notificaciones() { return this.nsrv; }

  ngOnInit() {
  }

  public saluda() {
    this.resultado = `Hola ${this.nombre}`;
  }

  public despide() {
    const pipe = new ElipsisPipe();
    this.resultado = pipe.transform(`Adios ${this.nombre}`, 20);
  }

  public di(algo: string): void {
    this.resultado = `Dice ${algo}`;
  }

  public cambia() {
    this.visible = !this.visible;
    this.conEstilo.importante = !this.conEstilo.importante;
    this.conEstilo.destacar = !this.conEstilo.destacar;
  }

  public calcula(a: number, b: number): number {
    return a + b;
  }

  public add(provincia: string): void {
    if (!provincia) {
      this.out.error('Falta la provincia');
      return;
    }
    const newId = this.listado.length === 0 ? 1 : this.listado[this.listado.length - 1].id + 1;
    this.listado.push({id: newId, nombre: provincia });
    this.idProvincia = newId;
  }

    // tslint:disable:member-ordering
    idiomas = [
      { codigo: 'es', region: 'España' },
      { codigo: 'pt', region: 'Portuges' },
      { codigo: 'en-US', region: 'USA' }
    ];
    idioma = this.idiomas[0].codigo;
    resultados: any[] = [];
    valCalculadora = 666;
    // tslint:enable:member-ordering

    ponResultado(origen: string, valor: any) {
      this.resultados.push({
        pos: this.resultados.length + 1,
        origen: origen,
        valor: valor
      });
    }
}
