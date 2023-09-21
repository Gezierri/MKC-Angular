import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule as RouterModules} from '@angular/router';
import {OrderComponent} from './components/order/order.component';
import {ProductComponent} from './components/product/list/product.component';
import {HomeComponent} from './components/home/home.component';
import {SidebarComponent} from "./components/sidebar/sidebar.component";

const routes: Routes = [
  {
    path: '', component: SidebarComponent, children: [
      {path: 'home', component: HomeComponent},
      {
        path: 'clients',
        loadChildren: () => import('./components/client/client.module')
          .then(m => m.ClientModule)
      },
      {path: 'orders', component: OrderComponent},
      {path: 'products', component: ProductComponent}
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModules.forRoot(routes),
  ],
  exports: [RouterModules]
})
export class AppRoutingModule {
}
