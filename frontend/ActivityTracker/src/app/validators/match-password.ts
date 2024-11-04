import { AbstractControl, ValidationErrors, ValidatorFn, FormGroup } from '@angular/forms';

export const passwordMatchValidator: ValidatorFn = (form: AbstractControl): ValidationErrors | null => {
  const password = form.get('password')?.value;
  const repeatPassword = form.get('repeatPassword')?.value;

  return password === repeatPassword ? null : { mismatch: true };
};
