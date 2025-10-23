import { AbstractControl, ValidationErrors } from '@angular/forms';

export function groupValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (value === null || value === undefined || value === '') return { required: true };
  if (!/^\d+$/.test(String(value))) return { invalidFormat: true };
  const num = Number(value);
  if (num < 0 || num > 999) return { outOfRange: true };
  return null;
}
