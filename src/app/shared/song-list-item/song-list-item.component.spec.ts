import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SongListItemComponent } from './song-list-item.component';

describe('SongListItemComponent', () => {
  let component: SongListItemComponent;
  let fixture: ComponentFixture<SongListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SongListItemComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SongListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
