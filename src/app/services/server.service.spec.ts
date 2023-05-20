import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ServerService } from './server.service';
import { User } from 'src/models/user';
import { post } from 'src/models/post';
import { comment } from 'src/models/comment';

describe('ServerService', () => {
  let service: ServerService;
  let httpClientTestingController: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ServerService);
    httpClientTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpClientTestingController.verify()
  })

  it('Should retrive Users from API via GET', ()  => {

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

    service.getUsers('1').subscribe((response: User[]) => {
      expect(response.length).toBe(2);
      expect(response).toEqual(users);
    })

    const request = httpClientTestingController.expectOne(`${service.API_URL}users?page=1&per_page=1`);
    expect(request.request.method).toBe('GET');
    request.flush(users);

  })

  it('Sould retrive posts from API via GET', () => {
    const posts: post[] = [{
      body: 'body',
      id: 1,
      user_id: 1,
      title: 'title'},
    {
      body: 'body',
      id: 2,
      user_id: 2,
      title: 'title'
    }];

    service.getPosts('1', '10').subscribe((res: post[]) => {
      expect(res.length).toBe(2);
      expect(res).toEqual(posts);
    })

    const request = httpClientTestingController.expectOne(service.API_URL + `posts?page=1&per_page=10`);
    expect(request.request.method).toBe('GET');

    request.flush(posts)
  })

  it('Should retrive a user from his id via GET', () => {

    const user: User = {
      name: 'test1',
      email: 'test@test1',
      id: 1,
      status: 'active',
      gender: 'male',
    }

    service.getUser('1').subscribe((res: any) => {
      expect(res).toEqual(user);
      expect(res.length).toBe(1)
    });

    const request = httpClientTestingController.expectOne(service.API_URL + `users/1`)
    expect(request.request.method).toBe('GET');

  });

  it('Should retrive comments from API via GET', () => {
    const comments: comment[] = [{
      name: 'name',
      body: 'body',
      id: 1,
      post_id: 1,
      email: 'email',
    },
    {
      name: 'name',
      body: 'body',
      id: 1,
      post_id: 2,
      email: 'email',
    }]

    service.getComments('1').subscribe((res: comment[]) => {
      expect(res.length).toBe(2);
      expect(res).toEqual(comments);
    })

    const request = httpClientTestingController.expectOne(service.API_URL + `posts/1/comments`);
    expect(request.request.method).toBe('GET');

    request.flush(comments)
  })

  it('Should publish a new comment for API via POST', () => {
    const name = 'name';
    const comment = 'comment';
    const email = 'email';
    const userId = 1;
    const postId = 1;

    service.publishComment(name, comment, email, userId, postId).subscribe();
    const request = httpClientTestingController.expectOne(service.API_URL + `posts/${postId}/comments`);
    expect(request.request.method).toBe('POST');
  })

  it('Sould create a new post for API cia POST', () => {
    service.createNewPost('1', 'body', 'title').subscribe();
    const request = httpClientTestingController.expectOne(service.API_URL + `users/1/posts`);
    expect(request.request.method).toBe('POST');
  });

  it('Should edit the user via PATCH', () => {

    service.editUser('1', 'name', 'email', 'gender').subscribe();
    const request = httpClientTestingController.expectOne(service.API_URL + `users/1`);
    expect(request.request.method).toBe('PATCH');
  })

  it('Should search a user by his name via GET', () => {
    const name  = 'name';
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
    service.searchUserByName(name).subscribe((res: User[]) => {
      expect(res.length).toBe(2);
      expect(res).toEqual(users)
    })

    const request = httpClientTestingController.expectOne(service.API_URL + `users?name=${name}`);
    expect(request.request.method).toBe('GET');

    request.flush(users);
  })

  it('Should search a user by his email via GET', () => {
    const email = 'email';
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
    service.searchUserByEmail(email).subscribe((res: User[]) => {
      expect(res.length).toBe(2);
      expect(res).toEqual(users)
    })

    const request = httpClientTestingController.expectOne(service.API_URL + `users?email=${email}`);
    expect(request.request.method).toBe('GET');

    request.flush(users)
  })

  it('Should delete a user via DELETE', () => {
    service.deleteUser('1').subscribe();
    const request = httpClientTestingController.expectOne(service.API_URL + `users/1`)
    expect(request.request.method).toBe('DELETE');
  })

  it('Should create a new user via POST', () => {
    service.createNewUser('name', 'email', 'gender').subscribe();

    const request = httpClientTestingController.expectOne(service.API_URL + `users`);
    expect(request.request.method).toBe('POST')
  })

});
