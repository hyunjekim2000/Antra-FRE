import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupStep22Component } from './signup-step2-2.component';

describe('SignupStep22Component', () => {
  let component: SignupStep22Component;
  let fixture: ComponentFixture<SignupStep22Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignupStep22Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupStep22Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
