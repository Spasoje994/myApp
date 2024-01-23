import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/interface/employee';
import { Office } from 'src/app/interface/office';
import { EmployeeService } from 'src/app/services/employee.service';
import { OfficeService } from 'src/app/services/office.service';

@Component({
  selector: 'app-employee-create-edit',
  templateUrl: './employee-create-edit.component.html',
  styleUrls: ['./employee-create-edit.component.scss'],
})
export class EmployeeCreateEditComponent implements OnInit {
  employee!: Employee;
  employeeId!: number;
  employeeOffices: Office[] = [];
  randomId = Math.floor(Math.random() * 100000) + 1;
  success = false;
  isDetails = false;

  employeeForm = this.fb.group({
    id: [{ value: this.randomId, disabled: true }],
    name: ['', Validators.required],
    surname: ['', Validators.required],
    phone: new FormArray([]),
    office: [0],
  });

  get phoneControls() {
    return (<FormArray>this.employeeForm.get('phone')).controls;
  }

  constructor(
    private officeService: OfficeService,
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.employeeId = this.route.snapshot.params['id'];
    let empDetails = this.route.snapshot.url[0].path;
    console.log('this.route.snapshot:', this.route.snapshot.url[0].path);
    if (this.employeeId) {
      console.log('this.employeeId:', this.employeeId);
      this.getEmployee();
      if (empDetails === 'details') {
        this.employeeForm.disable();
        this.isDetails = true;
      } else {
        this.isDetails = false;
      }
    }
    this.getOffices();
  }

  getOffices() {
    this.officeService.getOffices().subscribe((data: Office[]) => {
      this.employeeOffices = data;
      console.log(data);
    });
  }

  getEmployee() {
    this.employeeService
      .getEmployee(this.employeeId)
      .subscribe((data: Employee) => {
        this.employee = data;
        console.log('data:', data);

        this.employeeForm.get('id')?.setValue(this.employee.id);
        this.employeeForm.get('name')?.setValue(this.employee.name);
        this.employeeForm.get('surname')?.setValue(this.employee.surname);
        this.employeeForm.get('office')?.setValue(this.employee?.office?.id);
      });
  }

  addPhone() {
    const control = new FormControl(null);
    (<FormArray>this.employeeForm.get('phone')).push(control);
  }

  removePhone(i: number) {
    (<FormArray>this.employeeForm.get('phone')).removeAt(i);
  }

  onSubmit(form: any) {
    this.success = false;
    let office = this.employeeOffices.find((o) => o.id === form.office);

    if (this.employeeId) {
    } else {
      let formValue: Employee = {
        id: form.id,
        name: form.name,
        surname: form.surname,
        office: office!,
        phone: form.phone,
      };
      this.employeeService.addEmployee(formValue).subscribe((res: any) => {
        this.employeeForm.reset();
        this.success = true;
      });
    }
  }

  goBack() {
    this.router.navigate(['home']);
  }
}
