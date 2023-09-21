import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import {ProductComponent} from "./list/product.component";
import {NgxPaginationModule} from "ngx-pagination";
import {ClientModule} from "../client/client.module";

@NgModule({
  declarations: [
    ProductComponent
  ],
    imports: [
        CommonModule,
        ProductRoutingModule,
        NgxPaginationModule,
        ClientModule
    ]
})
export class ProductModule { }
