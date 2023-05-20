import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AUTHService } from 'src/app/services/auth.service';
import { TopBarComponent } from './top-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';


describe('TopBarComponent', () => {
  let component: TopBarComponent;
  let fixture: ComponentFixture<TopBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientModule, RouterTestingModule.withRoutes([
        {
            path: 'login',
            component: TopBarComponent,
        }
    ])],
      declarations: [ TopBarComponent ],
      providers: [ AUTHService,
        { provide: ActivatedRoute,
          useValue: {
            params: of({
              logged: true
            })
          }
        }
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],

    })
    .compileComponents();

    fixture = TestBed.createComponent(TopBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should logout', () => {
    const mockAuthService: jasmine.SpyObj<AUTHService> = jasmine.createSpyObj('authService', ['logout']);
    const mockRouter: jasmine.SpyObj<Router> = jasmine.createSpyObj('router', ['navigate']);
    component.isLogged = true;
    component.logout();
    expect(mockAuthService).toHaveBeenCalled;
    expect(mockRouter.navigate(['/login'])).toHaveBeenCalled;
    expect(component.isLogged).toBeFalse();
  })

  it('should set user as logged', () => {
    component.logged();
    expect(component.isLogged).toBeTrue();
  });

});
