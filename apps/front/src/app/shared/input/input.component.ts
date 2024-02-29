import {Component, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: InputComponent
    }
  ]
})
export class InputComponent implements ControlValueAccessor {

  @Input() icon: string = '';
  @Input() type: string = 'text';
  @Input() label: string = 'Label';
  @Input() name: string = 'name';
  @Input() valid: boolean = true;
  @Input() errorMsg: string = 'Error message';

  value: any = '';

  onChange = (value: any) => {
  };

  onTouched = () => {
  };

  touched = false;

  disabled = false;


  writeValue(value: number) {
    this.value = value;
  }

  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }

}
