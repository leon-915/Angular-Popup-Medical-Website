import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupStep4Component } from './signup-step4.component';

describe('SignupStep4Component', () => {
  let component: SignupStep4Component;
  let fixture: ComponentFixture<SignupStep4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupStep4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupStep4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
