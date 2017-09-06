import { FormControl } from '@angular/forms';

export function passwordValidator() {
  return function passwordValidator(control: FormControl) {
    if (!control.parent) {
      return null;
    }

    // Prepare password
    const preparedPassword = control.value ? control.value.split('') : [];

    // Test if password includes a large character
    const largeCheck = preparedPassword.some(single => single !== single.toLowerCase());

    // Test if password includes a small character
    const smallCheck = preparedPassword.some(single => single === single.toLowerCase());

    // Test if password includes a number
    const numberCheck = preparedPassword.some(single => !Number.isNaN(Number(single)));

    if (!largeCheck || !smallCheck || !numberCheck) {
      return {
        password: true
      };
    }

    return null;
  };
}
