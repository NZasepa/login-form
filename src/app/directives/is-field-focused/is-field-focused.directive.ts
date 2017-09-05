import { AfterViewInit, Directive, HostBinding, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[lfIsFieldFocused]'
})
export class IsFieldFocusedDirective implements AfterViewInit {
  @Input() set lfIsFieldFocused(input: Element) {
    this.input = input;
  }

  isFocused = false;
  input: Element;

  constructor(private renderer: Renderer2) { }

  @HostBinding('class.focused') get focused() {
    return this.isFocused;
  }

  ngAfterViewInit() {
    if (!this.input) {
      return;
    }

    // On input focus
    this.renderer.listen(this.input, 'focus', () => {
      this.isFocused = true;
    });

    // On input focusout
    this.renderer.listen(this.input, 'focusout', () => {
      this.isFocused = false;
    });
  }
}
