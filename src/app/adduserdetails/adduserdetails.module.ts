import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdduserdetailsPageRoutingModule } from './adduserdetails-routing.module';

import { AdduserdetailsPage } from './adduserdetails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AdduserdetailsPageRoutingModule
  ],
  declarations: [AdduserdetailsPage]
})
export class AdduserdetailsPageModule {}
