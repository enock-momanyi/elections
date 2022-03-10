import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { AdminComponent } from './admin/admin/admin.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth/auth.guard';
import { CandidateListComponent } from './candidate-list/candidate-list.component';
import { CountyComponent } from './county/county.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PresidencyComponent } from './presidency/presidency.component';
import { SignupComponent } from './signup/signup.component';
import { UserComponent } from './user/user.component';
import { LoginAdminComponent } from './admin/login/login.component';
import { LoginGuard } from './admin/login.guard';

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'',component:HomeComponent},
  {path:'county', component: CountyComponent},
  {path:'candidates/:areaId',component:CandidateListComponent},
  {path:'signup',component:SignupComponent},
  {path:'user',component:UserComponent},
  {path:'account', component:AccountComponent},
  {path:'president',component:PresidencyComponent},
  {path:'admin',canActivate:[LoginGuard],component:AdminComponent},
  {path:'admin/login',component:LoginAdminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
