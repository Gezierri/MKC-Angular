import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ClientRoutingModule} from './client-routing.module';
import {NumericOnlyDirective} from './client-form/numeric-only.directive';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import {ClientFormComponent} from './client-form/client-form.component';
import {ClientComponent} from './list/client.component';
import {InputMaskModule} from 'primeng/inputmask';
import {CalendarModule} from 'primeng/calendar';
import {LoadingComponent} from "../loading/loading.component";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {LoggerModule, NgxLoggerLevel} from "ngx-logger";

@NgModule({
  declarations: [
    ClientComponent,
    ClientFormComponent,
    NumericOnlyDirective,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    NgxPaginationModule,
    FormsModule,
    InputMaskModule,
    CalendarModule,
    ReactiveFormsModule,
    ProgressSpinnerModule,
    LoggerModule.forRoot({
      level: NgxLoggerLevel.DEBUG, // Nível de log desejado (por exemplo, DEBUG, INFO, ERROR)
      serverLogLevel: NgxLoggerLevel.OFF // Nível de log para envio ao servidor (OFF para desativar)
    })
  ],
})
export class ClientModule { }
