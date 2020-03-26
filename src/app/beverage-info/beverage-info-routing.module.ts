import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BeverageInfoPage } from './beverage-info.page';

const routes: Routes = [
  {
    path: '',
    component: BeverageInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BeverageInfoPageRoutingModule {}
