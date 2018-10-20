import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogComponent } from './blog.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { LoggerService } from '../../indra-core';
import { BlogVMService } from './blog-vm.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';

describe('BlogComponent', () => {
  let component: BlogComponent;
  let fixture: ComponentFixture<BlogComponent>;

  beforeEach(async(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    TestBed.configureTestingModule({
      declarations: [ BlogComponent ],
      schemas:      [ NO_ERRORS_SCHEMA ],
      providers:    [ BlogVMService, LoggerService,
        { provide: Router, useValue: routerSpy } ],
      imports: [ HttpClientTestingModule, ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
