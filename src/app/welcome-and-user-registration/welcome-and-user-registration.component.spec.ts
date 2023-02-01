import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeAndUserRegistrationComponent } from './welcome-and-user-registration.component';

describe('WelcomeAndUserRegistrationComponent', () => {
  let component: WelcomeAndUserRegistrationComponent;
  let fixture: ComponentFixture<WelcomeAndUserRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WelcomeAndUserRegistrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WelcomeAndUserRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
