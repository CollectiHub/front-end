import { Directive, inject } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Directive({
  selector: '[appNoopCustomFormControl]',
  standalone: true,
})
export class NoopCustomFormControlDirective implements ControlValueAccessor {
  private readonly ngControl = inject(NgControl, { self: true });

  constructor() {
    this.ngControl.valueAccessor = this;
  }

  registerOnChange(): void {
    return undefined;
  }

  registerOnTouched(): void {
    return undefined;
  }

  setDisabledState(): void {
    return undefined;
  }

  writeValue(): void {
    return undefined;
  }
}
