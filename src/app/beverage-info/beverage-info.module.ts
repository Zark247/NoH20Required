import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BeverageInfoPageRoutingModule } from './beverage-info-routing.module';

import { BeverageInfoPage } from './beverage-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    BeverageInfoPageRoutingModule
  ],
  declarations: [BeverageInfoPage]
})
export class BeverageInfoPageModule {}
