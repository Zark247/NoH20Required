import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BeverageListPageRoutingModule } from './beverage-list-routing.module';

import { BeverageListPage } from './beverage-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BeverageListPageRoutingModule
  ],
  declarations: [BeverageListPage]
})
export class BeverageListPageModule {}
