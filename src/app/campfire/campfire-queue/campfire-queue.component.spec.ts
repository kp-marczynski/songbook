import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CampfireQueueComponent } from './campfire-queue.component';

describe('CampfireQueueComponent', () => {
  let component: CampfireQueueComponent;
  let fixture: ComponentFixture<CampfireQueueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampfireQueueComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CampfireQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
