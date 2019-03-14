import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupStep5Component } from './signup-step5.component';

describe('SignupStep5Component', () => {
  let component: SignupStep5Component;
  let fixture: ComponentFixture<SignupStep5Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupStep5Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupStep5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
