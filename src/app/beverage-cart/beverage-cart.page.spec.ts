import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BeverageCartPage } from './beverage-cart.page';

describe('BeverageCartPage', () => {
  let component: BeverageCartPage;
  let fixture: ComponentFixture<BeverageCartPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeverageCartPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BeverageCartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
