import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TunerComponent } from './tuner.component';

describe('TunerComponent', () => {
  let component: TunerComponent;
  let fixture: ComponentFixture<TunerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TunerComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TunerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});