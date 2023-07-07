import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ClientRoutingModule } from './client-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ClientFormComponent } from './client-form/client-form.component';
import { ClientComponent } from './list/client.component';
import { InputMaskModule } from 'primeng/inputmask';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  declarations: [ClientComponent, ClientFormComponent],
  imports: [
    CommonModule,
    ClientRoutingModule,
    NgxPaginationModule,
    FormsModule,
    InputMaskModule,
    CalendarModule,
    ReactiveFormsModule
  ],
})
export class ClientModule {}
