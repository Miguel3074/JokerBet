import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { MaterialModule } from '../material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BodyModule } from './components/body/body.module';
import { FooterModule } from './components/footer/footer.module';
import { AuthService } from './service/auth.service';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';


@NgModule({
  declarations: [

  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    MaterialModule,
    FooterModule,
    BodyModule,
    HomeComponent,
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent
  ],
  providers: [
    AuthService
  ],
  bootstrap: [] 
})
export class AppModule { }
