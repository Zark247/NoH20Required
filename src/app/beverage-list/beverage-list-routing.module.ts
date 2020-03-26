import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BeverageListPage } from './beverage-list.page';

const routes: Routes = [
  {
    path: '',
    component: BeverageListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BeverageListPageRoutingModule {}
