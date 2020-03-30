import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CampfireGuestComponent } from './campfire-guest.component';

describe('CampfireGuestComponent', () => {
  let component: CampfireGuestComponent;
  let fixture: ComponentFixture<CampfireGuestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampfireGuestComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CampfireGuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
