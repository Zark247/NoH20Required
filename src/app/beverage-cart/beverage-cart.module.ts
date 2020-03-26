import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BeverageCartPageRoutingModule } from './beverage-cart-routing.module';

import { BeverageCartPage } from './beverage-cart.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BeverageCartPageRoutingModule
  ],
  declarations: [BeverageCartPage]
})
export class BeverageCartPageModule {}
