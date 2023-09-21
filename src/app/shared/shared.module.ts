import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DateFormatPipe} from "./date-format.pipe";
import {MatSidenavModule} from "@angular/material/sidenav";

@NgModule({
  declarations: [DateFormatPipe],
  imports: [
    CommonModule,
    MatSidenavModule
  ],
  exports: [
    DateFormatPipe
  ]
})
export class SharedModule { }
