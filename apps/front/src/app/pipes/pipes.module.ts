import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SanitizeHtmlPipe} from "./sanitizeHtml.pipe";



@NgModule({
  declarations: [
    SanitizeHtmlPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SanitizeHtmlPipe
  ]
})
export class PipesModule { }
