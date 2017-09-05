import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IsFieldFocusedDirective } from './is-field-focused/is-field-focused.directive';
import { FocusOnInitDirective } from './focus-on-init/focus-on-init.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    IsFieldFocusedDirective,
    FocusOnInitDirective,
  ],
  exports: [
    IsFieldFocusedDirective,
    FocusOnInitDirective
  ]
})
export class DirectivesModule { }
