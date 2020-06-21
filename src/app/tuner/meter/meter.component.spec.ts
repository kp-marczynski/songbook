import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MeterComponent } from './meter.component';

describe('MeterComponent', () => {
  let component: MeterComponent;
  let fixture: ComponentFixture<MeterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeterComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MeterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
