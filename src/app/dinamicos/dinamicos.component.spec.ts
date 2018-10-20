import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DinamicosComponent } from './dinamicos.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { DemoComponent } from '../demo/demo.component';
import { CalculadoraComponent } from '../calculadora/calculadora.component';
import { PersonasComponent } from '../personas/personas.component';
import { BlogComponent } from '../blog/blog.component';
import { LocalDecimalPipe, CapitalizePipe, ElipsisPipe, LoggerService } from '../../indra-core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';

describe('DinamicosComponent', () => {
  let component: DinamicosComponent;
  let fixture: ComponentFixture<DinamicosComponent>;

  beforeEach(async(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    TestBed.configureTestingModule({
      declarations: [ DinamicosComponent, HomeComponent, DemoComponent, CalculadoraComponent, PersonasComponent, BlogComponent,
        LocalDecimalPipe, CapitalizePipe, ElipsisPipe ],
        providers: [ LoggerService,
          { provide: Router, useValue: routerSpy } ],
        imports: [ HttpClientTestingModule, ],
      schemas:      [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DinamicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
