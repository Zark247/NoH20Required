import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(
    private themeService:ThemeService
  ) { }

  ngOnInit() {
  }

  // Dark/Light Mode

  enableDark(){
    this.themeService.enableDark();
  }
  enableLight(){
    this.themeService.enableLight();
  }
}
