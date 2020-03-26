import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SidePanelPage } from './side-panel.page';

describe('SidePanelPage', () => {
  let component: SidePanelPage;
  let fixture: ComponentFixture<SidePanelPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidePanelPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SidePanelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
