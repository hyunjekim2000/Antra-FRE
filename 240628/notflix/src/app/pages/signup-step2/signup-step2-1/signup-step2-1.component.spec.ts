import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupStep21Component } from './signup-step2-1.component';

describe('SignupStep21Component', () => {
  let component: SignupStep21Component;
  let fixture: ComponentFixture<SignupStep21Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignupStep21Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupStep21Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
