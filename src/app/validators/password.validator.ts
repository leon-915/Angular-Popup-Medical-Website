import { FormGroup, FormControl, AbstractControl } from '@angular/forms';

export interface ValidationResult {
  [key: string]: boolean;
}

export class PasswordValidator {
  public static checkPasswordEquality(
    group: FormGroup
  ): { [s: string]: boolean } {
    console.log(group);
    return group.get('pwd').value !== group.get('confirm').value
      ? { passwordsDoNotMatch: true }
      : null;
  }

  public static checkPasswordStrength(password: FormControl): any {
    console.log(password);
    const validations = {
      hasNumber: /\d/.test(password.value),
      hasUpper: /[A-Z]/.test(password.value),
      hasLower: /[a-z]/.test(password.value),
      hasEightCharacters: /^.{8,}/.test(password.value),
      hasSpecialCharacter: /[\^\$*.\[\]\{\}\(\)?\-\"!@#%&\/\\,><':;|_~`]/.test(
        password.value
      )
    };
    const errors = Object.keys(validations).find(key => {
      return !validations[key];
    });
    return errors ? { patternDoesNotMatch: true } : null;
  }

  static MatchPassword(AC: AbstractControl) {
    const password = AC.get('password').value; // to get value in input tag
    const confirmPassword = AC.get('confirmPassword').value; // to get value in input tag
    if (password !== confirmPassword) {
      AC.get('confirmPassword').setErrors({ MatchPassword: true });
    } else {
      return null;
    }
  }
  static LookEmptyness(AC: AbstractControl) {
    const email = String(AC.get('email').value); // to get value in input tag
    const phone = String(AC.get('phone').value); // to get value in input tag
    if (email.length === 0 && phone.length === 0) {
      AC.get('email').setErrors({ MatchPassword: true });
    } else {
      return null;
    }
  }
}
