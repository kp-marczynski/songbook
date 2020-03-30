import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SongScrollableDetailsComponent } from './song-scrollable-details.component';

describe('SongScrollableDetailsComponent', () => {
  let component: SongScrollableDetailsComponent;
  let fixture: ComponentFixture<SongScrollableDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SongScrollableDetailsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SongScrollableDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
