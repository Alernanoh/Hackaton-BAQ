import { Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { ProyectosComponent } from './components/proyectos/proyectos.component';

export const routes: Routes = [

  {path: 'form', component: FormComponent},
  {path: 'proyectos', component: ProyectosComponent},

];
