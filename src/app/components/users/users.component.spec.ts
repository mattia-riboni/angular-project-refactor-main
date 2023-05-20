import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AUTHService } from 'src/app/services/auth.service';
import { ServerService } from 'src/app/services/server.service';
import { UsersComponent } from './users.component';
import { User } from 'src/models/user';
import { of } from 'rxjs';
import { NgForm } from '@angular/forms';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let server: ServerService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersComponent ],
      providers: [ AUTHService, ServerService],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA],
      imports: [ HttpClientTestingModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    server = TestBed.inject(ServerService);
    fixture.detectChanges();
  });

  it('Shoul get users list', () => {
    component.perPage = '2';
    const users: User[] = [{
      name: 'test1',
      email: 'test@test1',
      id: 1,
      status: 'active',
      gender: 'male',
    },
    {
      name: 'test2',
      email: 'test@test2',
      id: 2,
      status: 'active',
      gender: 'male',
    }]

    const getUsersSpy = spyOn(server, 'getUsers').and.returnValue(of(users));
    component.getUsers();
    expect(getUsersSpy).toHaveBeenCalled();
    expect(component.users).toEqual(users);
    expect(component.users.length).toBe(2);
  });

  it('Should create a new user', () => {
    const fakeForm: NgForm = <NgForm>{
      value: {
        firstName: 'firstName',
        lastName: 'lastName'
      }
    }

    const createNewUserSpy = spyOn(server, 'createNewUser').and.callThrough();
    component.createNewUser(fakeForm);
    expect(createNewUserSpy).toHaveBeenCalled();
  });

  it('Should delete the selected user', () => {
    const deleteUserSpy = spyOn(server, 'deleteUser').and.callThrough();
    component.deleteUser('1', 'name', 1);
    expect(deleteUserSpy).toHaveBeenCalled();
  })

  it('Should push avatars srcs into his array', () => {
    component.avatars = [];
    component.setAvatars(5);
    expect(component.avatars.length).toBe(5);
  })

});
