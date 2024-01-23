import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Employee } from 'src/app/interface/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
})
export class EmployeesComponent implements OnInit, OnDestroy {
  employees: Employee[] = [];
  private destroy$ = new Subject();

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees() {
    this.employeeService
      .getEmployees()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: Employee[]) => {
        this.employees = data;
      });
  }

  navigateToCreate() {
    this.router.navigate(['create']);
  }

  navigateToEdit(employee: Employee) {
    this.router.navigate(['/edit', employee.id]);
  }

  navigateToDetails(employee: Employee) {
    this.router.navigate(['/details', employee.id]);
  }

  onDelete(employee: Employee) {
    console.log('employee:', employee.id);
    this.employeeService.deleteEmployee(employee).subscribe(() => {
      this.employees = this.employees.filter(
        (e: Employee) => e.id !== employee.id
      );
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }
}
