import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
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
  filteredEmployees: Employee[] = [];
  private destroy$ = new Subject();

  searchForm = this.fb.group({
    name: new FormControl(''),
    office: new FormControl(''),
  });

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getEmployees();
    this.filterSearch();
  }

  getEmployees() {
    this.employeeService
      .getEmployees()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: Employee[]) => {
        this.employees = data;
        this.filteredEmployees = data;
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
      this.filteredEmployees = this.filteredEmployees.filter(
        (e: Employee) => e.id !== employee.id
      );
    });
  }

  filterSearch() {
    this.searchForm.valueChanges.subscribe((value: any) => {
      if (value.name.length >= 3 || value.office.length >= 3) {
        this.filteredEmployees = this.employees.filter((emp: Employee) => {
          return (
            emp.name.toLowerCase().includes(value.name) &&
            emp.office.name.toLocaleLowerCase().includes(value.office)
          );
        });
      } else {
        this.filteredEmployees = this.employees;
      }
    });
  }

  clearFilterSearch() {
    this.searchForm.reset();
    this.filteredEmployees = this.employees;
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }
}
