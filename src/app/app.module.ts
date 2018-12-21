import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import localeEsExtra from '@angular/common/locales/extra/es';

registerLocaleData(localeEs, 'es', localeEsExtra);

import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClientXsrfModule } from '@angular/common/http';
import { IndraCoreModule, LoggerService, ERROR_LEVEL } from '../indra-core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../environments/environment';

import { MainModule } from './main/main.module';
import { SecurityModule, AuthInterceptor, LoggingInterceptor } from './security';

import { PersonasVMService, PersonasDAOVMService } from './personas/personas-vm.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DemoComponent } from './demo/demo.component';
import { CalculadoraComponent } from './calculadora/calculadora.component';
import { DinamicosComponent, DynamicComponent, MyHostDirective } from './dinamicos/dinamicos.component';
import { PERSONAS_COMPONENT } from './personas/personas.component';
import { BLOG_COMPONENT } from './blog/blog.component';
import { TARJETAS_COMPONENT } from './tarjetas/tarjetas.component';

import {EditorModule} from 'primeng/editor';
import {InplaceModule} from 'primeng/inplace';
import { AjaxWaitComponent, AjaxWaitInterceptor } from './ajax-wait/ajax-wait';
import { CommonAppModule } from './common-app';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DemoComponent,
    CalculadoraComponent,
    DinamicosComponent, DynamicComponent, MyHostDirective,
    PERSONAS_COMPONENT, BLOG_COMPONENT, TARJETAS_COMPONENT,
    AjaxWaitComponent,
  ],
  imports: [
    BrowserModule, FormsModule, ReactiveFormsModule, HttpClientModule,
    // HttpClientXsrfModule.withOptions({ cookieName: 'XSRF-TOKEN', headerName: 'X-XSRF-TOKEN', }),
    AppRoutingModule, IndraCoreModule, MainModule, CommonAppModule, SecurityModule,
    NgbModule.forRoot(), EditorModule, InplaceModule,
  ],
  providers: [
    LoggerService,
    { provide: ERROR_LEVEL, useValue: environment.ERROR_LEVEL },
    { provide: LOCALE_ID, useValue: 'es' },
    { provide: PersonasVMService, useClass: PersonasDAOVMService },
    { provide: HTTP_INTERCEPTORS, useClass: AjaxWaitInterceptor, multi: true, },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true, },
    { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true, },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
