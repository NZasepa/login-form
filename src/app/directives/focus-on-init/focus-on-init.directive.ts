import { AfterViewInit, Directive, ElementRef } from '@angular/core';

/**
 * Focus field on init
 */
@Directive({
  selector: '[lfFocusOnInit]'
})
export class FocusOnInitDirective implements AfterViewInit {

  constructor(private el: ElementRef) { }

  ngAfterViewInit() {
    setTimeout(() => {
      this.el.nativeElement.focus();
    }, 0);
  }
}
