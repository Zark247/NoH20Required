import { NgModule } from '@angular/core';
// import { Ng2GoogleChartsModule, GoogleChartsSettings } from 'ng2-google-charts';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
// import{ GoogleChartsModule } from 'angular-google-charts';
// import { Chart } from 'chart.js';
import {ChartsModule} from 'ng2-charts';
import { HomePage } from './home.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChartsModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
