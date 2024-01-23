import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './core/header/header.component';
import { EmployeesComponent } from './features/employees/employees.component';
import { EmployeeCreateEditComponent } from './features/employee-create-edit/employee-create-edit.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, EmployeesComponent, EmployeeCreateEditComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
