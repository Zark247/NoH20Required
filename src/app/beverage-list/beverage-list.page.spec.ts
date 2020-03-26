import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BeverageListPage } from './beverage-list.page';

describe('BeverageListPage', () => {
  let component: BeverageListPage;
  let fixture: ComponentFixture<BeverageListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeverageListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BeverageListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
