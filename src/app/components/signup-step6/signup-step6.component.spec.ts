import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupStep6Component } from './signup-step6.component';

describe('SignupStep6Component', () => {
  let component: SignupStep6Component;
  let fixture: ComponentFixture<SignupStep6Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupStep6Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupStep6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
