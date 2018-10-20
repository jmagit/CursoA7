import { Component, OnInit, ViewContainerRef, ViewChild, ComponentFactoryResolver, Directive } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { DemoComponent } from '../demo/demo.component';
import { CalculadoraComponent } from '../calculadora/calculadora.component';
import { PersonasComponent } from '../personas/personas.component';
import { BlogComponent } from '../blog/blog.component';

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styleUrls: ['./dinamicos.component.css'],
  entryComponents: [ HomeComponent, DemoComponent, CalculadoraComponent, PersonasComponent, BlogComponent ],
})
export class DinamicosComponent implements OnInit {
  menu = [
    { texto: 'Blog', componente: BlogComponent},
    { texto: 'Personas', componente: PersonasComponent},
    { texto: 'Inicio', componente: HomeComponent},
    { texto: 'Demo', componente: DemoComponent},
    { texto: 'Calculadora', componente: CalculadoraComponent },
  ];
  componente = this.menu[0].componente;

  constructor() { }

  ngOnInit() {
  }

  seleciona(indice: number) {
    if ( 0 <= indice && indice < this.menu.length ) {
      this.componente = this.menu[indice].componente;
    }
  }
}
@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[my-host]',
})
export class MyHostDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}

@Component({
  selector: 'app-dynamic',
  template: `
  <p>
    <input type="button" *ngFor="let m of menu; let i=index;" value="{{m.texto}}"
      (click)="seleciona(i)">
    <app-login></app-login>
  </p>
  <ng-template my-host></ng-template>`,
})
export class DynamicComponent implements OnInit {
  @ViewChild(MyHostDirective) myHost: MyHostDirective;
  menu = [
    { texto: 'Inicio', componente: HomeComponent},
    { texto: 'Blog', componente: BlogComponent},
    { texto: 'Personas', componente: PersonasComponent},
    { texto: 'Demo', componente: DemoComponent},
    { texto: 'Calculadora', componente: CalculadoraComponent },
  ];
  componente: any = this.menu[0].componente;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.loadComponent();
  }

  seleciona(indice: number) {
    if ( 0 <= indice && indice < this.menu.length ) {
      this.componente = this.menu[indice].componente;
      this.loadComponent();
    }
  }
  loadComponent() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.componente);
    const viewContainerRef = this.myHost.viewContainerRef;
    // viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
  }

}
