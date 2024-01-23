import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './features/employees/employees.component';
import { EmployeeCreateEditComponent } from './features/employee-create-edit/employee-create-edit.component';

const routes: Routes = [
  {
    path: 'home',
    component: EmployeesComponent,
  },
  {
    path: 'create',
    component: EmployeeCreateEditComponent,
  },
  {
    path: 'edit/:id',
    component: EmployeeCreateEditComponent,
  },
  {
    path: 'details/:id',
    component: EmployeeCreateEditComponent,
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
