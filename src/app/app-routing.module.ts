import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule as RouterModules } from '@angular/router';
import { ClientComponent } from './components/client/client.component';
import { OrderComponent } from './components/order/order.component';
import { ProductComponent } from './components/product/product.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'clients', component: ClientComponent },
  { path: 'orders', component: OrderComponent },
  { path: 'products', component: ProductComponent }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModules.forRoot(routes),
  ],
  exports: [RouterModules]
})
export class AppRoutingModule { }
