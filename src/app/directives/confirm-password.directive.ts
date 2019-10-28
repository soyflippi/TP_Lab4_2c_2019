import { Directive, Input } from '@angular/core';
import { Validator, NG_VALIDATORS, AbstractControl, ValidationErrors } from '@angular/forms';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appConfirmPassword]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: ConfirmPasswordDirective,
    multi: true
  }]
})
export class ConfirmPasswordDirective implements Validator {
  @Input() appConfirmPassword: string;

  validate(control: AbstractControl): ValidationErrors | null {

    if (control.value === null || control.value.length === 0) {
      return null;
    }

    const ctrlToCompare = control.parent.get(this.appConfirmPassword);
    if (ctrlToCompare) {
      const subscription: Subscription = ctrlToCompare.valueChanges.subscribe(() => {
        control.updateValueAndValidity();
        subscription.unsubscribe();
      });
    }
    return ctrlToCompare && ctrlToCompare.value !== control.value ? { 'appConfirmPassword': true } : null;
  }

  constructor() { }

}

