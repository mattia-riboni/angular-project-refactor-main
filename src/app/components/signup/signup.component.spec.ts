import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AUTHService } from 'src/app/services/auth.service';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA} from '@angular/core'

import { SignupComponent } from './signup.component';
import { Router } from '@angular/router';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let authService: AUTHService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA],
      providers: [ AUTHService ],
      imports: [ HttpClientTestingModule, FormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AUTHService);
    fixture.detectChanges();
  });

  it('should login', () => {
    const fakeForm: NgForm = <NgForm>{
      value: {
        email: 'email',
        password: 'password'
      }
    }
    const signUpSpy = spyOn(authService, 'signUp').and.callThrough()
    component.onSubmit(fakeForm);
    expect(signUpSpy).toHaveBeenCalled();
  });
});
