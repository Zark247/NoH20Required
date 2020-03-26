import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BeverageInfoPage } from './beverage-info.page';

describe('BeverageInfoPage', () => {
  let component: BeverageInfoPage;
  let fixture: ComponentFixture<BeverageInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeverageInfoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BeverageInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
