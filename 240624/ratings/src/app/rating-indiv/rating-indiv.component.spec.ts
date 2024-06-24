import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingIndivComponent } from './rating-indiv.component';

describe('RatingIndivComponent', () => {
  let component: RatingIndivComponent;
  let fixture: ComponentFixture<RatingIndivComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RatingIndivComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RatingIndivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
