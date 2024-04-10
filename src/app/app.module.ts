import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CityComponent } from './city/city.component';
import { NgFor } from '@angular/common';

import { AddcityComponent } from './addcity/addcity.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdatecityComponent } from './updatecity/updatecity.component';
import { FormsModule } from '@angular/forms';
import { LoginFormComponent } from './login-form/login-form.component';
import { AuthService } from './services/auth.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HeaderComponent } from './header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RegisterFormComponent } from './register-form/register-form.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { customInterceptor } from './custom.interceptor';
import { CitydetailComponent } from './citydetail/citydetail.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CityComponent,
    AddcityComponent,
    UpdatecityComponent,
    LoginFormComponent,
    HeaderComponent,
    RegisterFormComponent,
    CitydetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgFor,
    ReactiveFormsModule,
    FormsModule,
    MatToolbarModule
    
    
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: customInterceptor, multi: true },
    AuthService,
    provideAnimationsAsync()
     
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
