import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
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
  nameSearch = new FormControl('');
  officeSearch = new FormControl('');

  constructor(
    private employeeService: EmployeeService,
    private router: Router
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
    this.nameSearch.valueChanges.subscribe((name: any) => {
      if (name.length >= 3) {
        this.filteredEmployees = this.employees.filter((value: Employee) => {
          return value.name
            .toLocaleLowerCase()
            .includes(name.toLocaleLowerCase());
        });
      } else {
        this.filteredEmployees = this.employees;
      }
    });

    this.officeSearch.valueChanges.subscribe((office: any) => {
      if (office.length >= 3) {
        console.log('office:', office);
        this.filteredEmployees = this.employees.filter((value: Employee) => {
          return value.office.name
            .toLocaleLowerCase()
            .includes(office.toLocaleLowerCase());
        });
      } else {
        this.filteredEmployees = this.employees;
      }
    });
  }

  clearFilterSearch() {
    this.nameSearch.setValue('');
    this.officeSearch.setValue('');
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }
}
