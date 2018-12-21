import { TestBed, inject, async, fakeAsync, tick } from '@angular/core/testing';

import { PersonasVMService, PersonasDAOService } from './personas-vm.service';
import { LoggerService } from '../../indra-core';
import { Router } from '@angular/router';
import { DAOServiceMock } from '../../testing/dao-service-stub';
import { DAOService } from '../base-code/view-model';

describe('PersonasVMService', () => {
  beforeEach(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    TestBed.configureTestingModule({
      providers: [PersonasVMService,
        LoggerService,
        { provide: PersonasDAOService, useValue: new DAOServiceMock([
          { id: 1, nombre: 'Carmelo', apellidos: 'Coton', edad: 34},
          { id: 2, nombre: 'Pepito', apellidos: 'Grillo', edad: 155},
          { id: 3, nombre: 'Pedro', apellidos: 'Pica Piedra', edad: 50},
          { id: 4, nombre: 'Pablo', apellidos: 'Marmol', edad: 18},
        ])},
        { provide: Router, useValue: routerSpy }]
    });
  });

  it('should be created', inject([PersonasVMService], (service: PersonasVMService) => {
    expect(service).toBeTruthy();
  }));
  it('list', fakeAsync(inject([PersonasVMService], (service: PersonasVMService) => {
    service.list();
    tick();
    expect(service.Listado.length).toBe(4);
  })));
  xit('edit', fakeAsync(inject([PersonasVMService, { provide: PersonasDAOService, useValue: new DAOServiceMock([
    { id: 1, nombre: 'Carmelo', apellidos: 'Coton', edad: 34},
    { id: 2, nombre: 'Pepito', apellidos: 'Grillo', edad: 155},
    { id: 3, nombre: 'Pedro', apellidos: 'Pica Piedra', edad: 50},
    { id: 4, nombre: 'Pablo', apellidos: 'Marmol', edad: 18},
  ])}], (service: PersonasVMService) => {
    service.edit(1);
    tick();
    expect(service.Elemento).toBeDefined();
    expect(service.Elemento.nombre).toBe('Pepito');
    expect(service.Modo).toBe('edit');
  })));

});
