import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServerService } from 'src/app/services/server.service';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


import { UserDetailComponent } from './user-detail.component';
import { AUTHService } from 'src/app/services/auth.service';
import { User } from 'src/models/user';
import { of } from 'rxjs';
import { NgFor } from '@angular/common';
import { NgForm } from '@angular/forms';


describe('UserDetailComponent', () => {
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;
  let server: ServerService;
  let fakeActivatedRoute = {
    snapshot: { data: {  } }
  } as ActivatedRoute;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserDetailComponent ],
      providers: [ AUTHService, ServerService, {
        provide: ActivatedRoute,  useValue: fakeActivatedRoute
      }],
      imports: [ HttpClientTestingModule, RouterTestingModule ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDetailComponent);
    component = fixture.componentInstance;
    server = TestBed.inject(ServerService);
    fixture.detectChanges();
  });

  it('Should get user info', () => {
    const user: User = {
      name: 'test1',
      email: 'test@test1',
      id: 1,
      status: 'active',
      gender: 'male',
    }
    const getUserSpy = spyOn(server, 'getUser').and.returnValue(of(user));
    component.getUser();
    expect(getUserSpy).toHaveBeenCalled();
    expect(component.user).toEqual(user);
    expect(component.name).toEqual(user.name);
    expect(component.email).toEqual(user.email);
  })

  it('Should open new post editor', () => {
    component.newPostOpened = false;
    component.editingUserOpened = true;
    component.editingPostsOpened = true;
    component.newPost();
    expect(component.newPostOpened).toBeTrue();
    expect(component.editingUserOpened).toBeFalse();
    expect(component.editingPostsOpened).toBeFalse()
  })

  it('Should open user editor', () => {
    component.newPostOpened = true;
    component.editingUserOpened = false;
    component.editingPostsOpened = true;
    component.editingUser();
    expect(component.newPostOpened).toBeFalse();
    expect(component.editingUserOpened).toBeTrue();
    expect(component.editingPostsOpened).toBeFalse()
  })


  it('Shoul create a new post', () => {
    const fakeForm: NgForm = <NgForm>{
      value: {
        body: 'body',
        title: 'title',
      }
    }

    const user: User = {
      name: 'test1',
      email: 'test@test1',
      id: 1,
      status: 'active',
      gender: 'male',
    }

    component.user = user;
    const createNewPostSpy = spyOn(server, 'createNewPost').and.callThrough();
    component.createNewPost(fakeForm);
    expect(createNewPostSpy).toHaveBeenCalled();
  })

  it('Should edit the user', () => {
    const fakeForm: NgForm = <NgForm>{
      value: {
        name: 'name',
        email: 'email',
      }
    }

    const editUserSpy = spyOn(server, 'editUser').and.callThrough();
    component.editUser(fakeForm);
    expect(editUserSpy).toHaveBeenCalled();
  })
});
