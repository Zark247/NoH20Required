import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SidePanelPageRoutingModule } from './side-panel-routing.module';

import { SidePanelPage } from './side-panel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SidePanelPageRoutingModule
  ],
  declarations: [SidePanelPage]
})
export class SidePanelPageModule {}
