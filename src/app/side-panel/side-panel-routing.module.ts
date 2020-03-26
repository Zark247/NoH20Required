import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SidePanelPage } from './side-panel.page';

const routes: Routes = [
  {
    path: '',
    component: SidePanelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SidePanelPageRoutingModule {}
