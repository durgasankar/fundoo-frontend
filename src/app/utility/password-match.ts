import { FormGroup, AbstractControl } from "@angular/forms";

export function MatchPassword(password: string, confirmPassword: string) {
  return (formGroup: FormGroup) => {
    const fetchedPassword = formGroup.controls[password];
    const fetchedMatchingPassword = formGroup.controls[confirmPassword];

    if (
      fetchedMatchingPassword.errors &&
      !fetchedMatchingPassword.errors.mustMatch
    ) {
      // return if another validator has already found an error on the matchingControl
      return;
    }

    // set error on matchingControl if validation fails
    if (fetchedPassword.value !== fetchedMatchingPassword.value) {
      fetchedMatchingPassword.setErrors({ mustMatch: true });
    } else {
      fetchedMatchingPassword.setErrors(null);
    }
  };
}
