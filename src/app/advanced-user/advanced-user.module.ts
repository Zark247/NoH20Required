import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdvancedUserPageRoutingModule } from './advanced-user-routing.module';

import { AdvancedUserPage } from './advanced-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdvancedUserPageRoutingModule
  ],
  declarations: [AdvancedUserPage]
})
export class AdvancedUserPageModule {}
