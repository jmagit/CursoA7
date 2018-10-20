import { TestBed, inject } from '@angular/core/testing';

import { BlogVMService } from './blog-vm.service';
import { LoggerService } from '../../indra-core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';

describe('BlogVMService', () => {
  beforeEach(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    TestBed.configureTestingModule({
      providers: [BlogVMService, LoggerService,
        { provide: Router, useValue: routerSpy }],
      imports:   [ HttpClientTestingModule, ],
    });
  });

  it('should be created', inject([BlogVMService], (service: BlogVMService) => {
    expect(service).toBeTruthy();
  }));
});
