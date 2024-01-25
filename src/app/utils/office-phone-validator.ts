import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function officePhonesValidator(): ValidatorFn {
  return (form: AbstractControl): ValidationErrors | null => {
    const employee = form.value;

    if (employee.office && employee.phone.length === 0) {
      return { phonesRequired: true };
    }
    return null;
  };
}
