import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonasComponent } from './personas.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PersonasVMService } from './personas-vm.service';
import { LoggerService } from '../../indra-core';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PersonasComponent', () => {
  let component: PersonasComponent;
  let fixture: ComponentFixture<PersonasComponent>;

  beforeEach(async(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    TestBed.configureTestingModule({
      declarations: [ PersonasComponent ],
      schemas:      [ NO_ERRORS_SCHEMA ],
      providers: [ PersonasVMService, LoggerService,
        { provide: Router, useValue: routerSpy } ],
      imports: [ HttpClientTestingModule, ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
