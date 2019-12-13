import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QueueListComponent } from './queue-list.component';

describe('QueueListComponent', () => {
  let component: QueueListComponent;
  let fixture: ComponentFixture<QueueListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueueListComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QueueListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
