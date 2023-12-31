import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientFormComponent } from './client-form/client-form.component';
import { ClientComponent } from './list/client.component';

const routes: Routes = [
  {path: '', component: ClientComponent},
  {path: 'client-product-form', component: ClientFormComponent},
  {path: 'client-product-form/:id', component: ClientFormComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule {
}
