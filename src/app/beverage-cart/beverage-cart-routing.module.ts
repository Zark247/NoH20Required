import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BeverageCartPage } from './beverage-cart.page';

const routes: Routes = [
  {
    path: '',
    component: BeverageCartPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BeverageCartPageRoutingModule {}
