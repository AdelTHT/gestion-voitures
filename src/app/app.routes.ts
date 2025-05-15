import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CarListComponent } from './components/car-list/car-list.component';
import { CarFormComponent } from './components/car-form/car-form.component';
import { authGuard, adminGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/cars', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'cars', component: CarListComponent, canActivate: [authGuard] },
  { path: 'cars/add', component: CarFormComponent, canActivate: [authGuard, adminGuard] },
  { path: 'cars/edit/:id', component: CarFormComponent, canActivate: [authGuard, adminGuard] }
];
