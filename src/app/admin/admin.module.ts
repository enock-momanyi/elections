import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { LoginAdminComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AdminComponent,
    LoginAdminComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class AdminModule { }
