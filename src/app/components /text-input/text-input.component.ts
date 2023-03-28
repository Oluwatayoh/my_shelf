import { Component, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextInputComponent),
      multi: true,
    },
  ],
})
export class TextInputComponent implements ControlValueAccessor {
  @Input() prefixVarient?: string;
  @Input() type: string;
  @Input() name?: string;
  @Input() label?: string | null;
  @Input() placeholder?: string | null;
  @Input() prefix?: boolean | null;
  @Input() isRequired?: boolean | null;
  @Input() isDisabled?: boolean = false;

  constructor() {
    this.type = 'text';
  }

  ngOnInit(): void {}

  private _value: any = '';
  get value(): any { return this._value; };

  set value(v: any) {
    if (v !== this._value) {
      this._value = v;
      this.onChange(v);
    }
  }

    writeValue(value: any) {
      this._value = value;
      this.onChange(value);
    }

    onChange = (_: any) => {};
    onTouched = () => {};
    registerOnChange(fn: (_: any) => void): void { this.onChange = fn; }
    registerOnTouched(fn: () => void): void { this.onTouched = fn; }

}
