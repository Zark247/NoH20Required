import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateuserdetailsPage } from './updateuserdetails.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateuserdetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateuserdetailsPageRoutingModule {}