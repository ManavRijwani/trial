import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CityComponent } from './city/city.component';
import { AddcityComponent } from './addcity/addcity.component';
import { UpdatecityComponent } from './updatecity/updatecity.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { AuthGuard } from './AuthGuard';
import { RegisterFormComponent } from './register-form/register-form.component';
import { CitydetailComponent } from './citydetail/citydetail.component';
import { Home2Component } from './home2/home2.component';
import { TabsComponent } from './tabs/tabs.component';
import { NavbarComponent } from './navbar/navbar.component';

//import { AuthGuard } from './AuthGuard';




const routes: Routes = [

  
  { path: '', redirectTo: '/loginform', pathMatch: 'full' },

  {
    path: 'loginform',
    component: LoginFormComponent
  },

  {
    path: 'registerform',
    component: RegisterFormComponent
  },
  
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'home2',
    component: Home2Component,
  },
  {
    path: 'city',
    component: CityComponent,
    canActivate: [AuthGuard]
  },
  
  {
    path: 'addcity',
    component: AddcityComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'updatecity/:id',
    component: UpdatecityComponent,
    canActivate: [AuthGuard]
  },

  { 
    path: 'city-detail/:id', 
    component: CitydetailComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'tabs', 
    component: TabsComponent,
  },
  { 
    path: 'navbar', 
    component: NavbarComponent,
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
