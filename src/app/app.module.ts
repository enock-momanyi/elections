import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DatabaseService } from './database.service';
import { CountyComponent } from './county/county.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './home/home.component';
import { CandidateListComponent } from './candidate-list/candidate-list.component';
import { AccountComponent } from './account/account.component';
import { PresidencyComponent } from './presidency/presidency.component';
import { AdminModule } from './admin/admin.module';

@NgModule({
  declarations: [
    AppComponent,
    CountyComponent,
    SignupComponent,
    LoginComponent,
    UserComponent,
    HomeComponent,
    CandidateListComponent,
    AccountComponent,
    PresidencyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AdminModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
