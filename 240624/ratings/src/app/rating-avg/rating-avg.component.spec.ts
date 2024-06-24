import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingAvgComponent } from './rating-avg.component';

describe('RatingAvgComponent', () => {
  let component: RatingAvgComponent;
  let fixture: ComponentFixture<RatingAvgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RatingAvgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RatingAvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
