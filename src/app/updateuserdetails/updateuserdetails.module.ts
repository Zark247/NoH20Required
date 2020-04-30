import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateuserdetailsPageRoutingModule } from './updateuserdetails-routing.module';

import { UpdateuserdetailsPage } from './updateuserdetails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateuserdetailsPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [UpdateuserdetailsPage]
})
export class UpdateuserdetailsPageModule {}
