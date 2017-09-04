import { Directive, ElementRef, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[lfFieldFocus]'
})
export class FieldFocusDirective {
  @Input() set lfFieldFocus(input: ElementRef) {
    console.log(input);
  }

  isFocused = false;

  constructor(private el: ElementRef) { }

  @HostBinding('class.focued') get focused() {
    return this.isFocused;
  }

  @HostListener('focus') onFocus() {
    console.log('focused');
    this.isFocused = true;
  }

  @HostListener('focusout') onFocusOut() {
    console.log('focus out');
    this.isFocused = false;
  }
}
