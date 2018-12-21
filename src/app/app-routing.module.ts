import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './main';
import { HomeComponent } from './home/home.component';
import { DemoComponent } from './demo/demo.component';
import { CalculadoraComponent } from './calculadora/calculadora.component';
import {
  PersonasListComponent,
  PersonasViewComponent,
  PersonasEditComponent,
  PersonasAddComponent
} from './personas/personas.component';
import {
  BlogListComponent,
  BlogViewComponent,
  BlogAddComponent,
  BlogEditComponent
} from './blog/blog.component';
import { AuthGuard, RegisterUserComponent } from './security';
import {
  TarjetasListComponent,
  TarjetasAddComponent,
  TarjetasEditComponent,
  TarjetasViewComponent
} from './tarjetas/tarjetas.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'inicio', redirectTo: '/' },
  { path: 'demo', component: DemoComponent },
  {
    path: 'chisme/de/calcular',
    component: CalculadoraComponent,
    data: { pageTitle: 'Calculadora' }
  },
  { path: 'personas', component: PersonasListComponent },
  {
    path: 'personas/add',
    component: PersonasAddComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'personas/:id/edit',
    component: PersonasEditComponent,
    canActivate: [AuthGuard]
  },
  { path: 'personas/:id', component: PersonasViewComponent },
  { path: 'personas/:id/:kk', component: PersonasViewComponent },
  {
    path: 'blog',
    children: [
      { path: '', component: BlogListComponent },
      { path: 'add', component: BlogAddComponent },
      { path: ':id/edit', component: BlogEditComponent },
      { path: ':id', component: BlogViewComponent },
      { path: ':id/:kk', component: BlogViewComponent }
    ]
  },
  {
    path: 'tarjetas',
    children: [
      { path: '', component: TarjetasListComponent },
      { path: 'add', component: TarjetasAddComponent },
      { path: ':id/edit', component: TarjetasEditComponent },
      { path: ':id', component: TarjetasViewComponent },
      { path: ':id/:kk', component: TarjetasViewComponent }
    ]
  },
  { path: 'registro', component: RegisterUserComponent },
  { path: 'config', loadChildren: './setting/setting.module#SettingModule' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
