import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AUTHService } from 'src/app/services/auth.service';
import { LoginComponent } from './login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { Router } from '@angular/router';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AUTHService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [ AUTHService ],
      imports: [ HttpClientTestingModule, FormsModule],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AUTHService)
    fixture.detectChanges();
  });

  it('should login and navigate to global section', () => {
    let mockLocalStorage: any = {};
    const fakeForm: NgForm = <NgForm>{
      value: {
        email: 'email',
        password: 'password'
      }
    }
    spyOn(window.localStorage, 'setItem').and.callFake(
      (key: string, value: string) => (mockLocalStorage[key] = value + '')
    );
    const loginSpy = spyOn(authService, 'login').and.callThrough();
    component.onSubmit(fakeForm);
    expect(loginSpy).toHaveBeenCalled();
  });


});
