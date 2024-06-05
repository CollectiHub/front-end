import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UserDataFetchFailedComponent } from './user-data-fetch-failed.component';

describe('UserDataFetchFailedComponent', () => {
  let component: UserDataFetchFailedComponent;
  let fixture: ComponentFixture<UserDataFetchFailedComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDataFetchFailedComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UserDataFetchFailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
