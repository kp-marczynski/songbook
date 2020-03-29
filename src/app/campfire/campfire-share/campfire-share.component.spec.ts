import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CampfireShareComponent } from './campfire-share.component';

describe('CampfireShareComponent', () => {
  let component: CampfireShareComponent;
  let fixture: ComponentFixture<CampfireShareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampfireShareComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CampfireShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
