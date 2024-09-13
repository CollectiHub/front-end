import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressBarSkeletonComponent } from './progress-bar-skeleton.component';

describe('ProgressBarSkeletonComponent', () => {
  let component: ProgressBarSkeletonComponent;
  let fixture: ComponentFixture<ProgressBarSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressBarSkeletonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgressBarSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
