import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupStep23Component } from './signup-step2-3.component';

describe('SignupStep23Component', () => {
  let component: SignupStep23Component;
  let fixture: ComponentFixture<SignupStep23Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignupStep23Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupStep23Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
