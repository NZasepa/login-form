import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldFocusDirective } from './field-focus/field-focus.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    FieldFocusDirective
  ],
  exports: [
    FieldFocusDirective
  ]
})
export class DirectivesModule { }
