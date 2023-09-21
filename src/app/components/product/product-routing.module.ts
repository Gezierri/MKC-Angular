import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ClientComponent} from "../client/list/client.component";
import {ClientFormComponent} from "../client/client-form/client-form.component";
import {ProductComponent} from "./list/product.component";

const routes: Routes = [
  {path: '', component: ProductComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
