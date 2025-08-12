import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appMatchValue]',
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: MatchValueDirective,
      multi: true,
    },
  ],
})
export class MatchValueDirective implements Validator{

  @Input('appMatchValue') requiredValue!: string; // Accept dynamic value


  validate(control: AbstractControl): ValidationErrors | null {
    if (control.value === this.requiredValue) {
      return null; // Valid
    }
    return { matchValue: { valid: false, requiredValue: this.requiredValue } }; // Invalid
  }

}
