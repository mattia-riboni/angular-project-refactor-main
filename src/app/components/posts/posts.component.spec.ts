import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ServerService } from 'src/app/services/server.service';
import { AUTHService } from 'src/app/services/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PostsComponent } from './posts.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { post } from 'src/models/post';
import { User } from 'src/models/user';
import { comment } from 'src/models/comment';
import { NgForm } from '@angular/forms';

describe('PostsComponent', () => {
  let component: PostsComponent;
  let fixture: ComponentFixture<PostsComponent>;
  let server: ServerService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostsComponent ],
      providers: [ ServerService, AUTHService ],
      imports: [ HttpClientTestingModule ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    server = TestBed.inject(ServerService);

  });

  it('Should get posts section and relative info for the home page', () => {
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
    component.userId = null
    component.perPage = '2'
    component.posts = posts;
    const getPostsSpy = spyOn(server, 'getPosts').and.callThrough()
    component.getContent();
    expect(getPostsSpy).toHaveBeenCalled()
  })

  it('Should show that the user has no posts', fakeAsync(() => {
    const getUserPostsSpy = spyOn(server, 'getUserPost').and.returnValue(of([]))
    const posts = [{
      title: 'No posts',
      body: 'This user has 0 posts published',
      user_id: 0,
      id: 0,
    }];
    component.userId = '1';
    component.getContent();
    expect(getUserPostsSpy).toHaveBeenCalled();
    expect(component.posts).toEqual(posts)
  }))

  it("Should get a specific user's post", fakeAsync(() => {
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
    const getUserPostsSpy = spyOn(server, 'getUserPost').and.returnValue(of(posts))

    component.userId = '1';
    component.getContent();
    expect(getUserPostsSpy).toHaveBeenCalled();
    expect(component.posts.length).toBe(2)
    expect(component.posts).toEqual(posts)
  }))

  it('Should get all the info about his owner for every post',fakeAsync(() => {
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


    const getUserSpy = spyOn(server, 'getUser').and.returnValue(of(users));
    component.perPage = '2';
    component.posts = posts;
    component.getPostOwnerInfo();
    expect(getUserSpy).toHaveBeenCalled();
    expect(component.names.length).toBe(2);
    expect(component.avatars.length).toBe(2);
  }))

  it('Should push a different link image for every post', () => {
    component.perPage = '5';
    component.getImgs();
    expect(component.imgs.length).toBe(5);
    for (let i = 1; i < +component.perPage; i++){
      expect(component.imgs[i]).not.toEqual(component.imgs[i - 1])
    }
  })

  it('Should set every post caption as closed', () => {
    expect(component.bodyOpened).toEqual([])
    component.perPage = '3';
    component.setPostsClosed();
    for (let i = 0; i < +component.perPage; i++){
      expect(component.bodyOpened[i]).toBeFalse;
    }
  })

  it('Should set every post comment as closed', () => {
    component.perPage = '4';
    expect(component.commentsOpened).toEqual([]);
    component.setCommentsClosed();
    expect(component.commentsOpened.length).toBe(4);
  })

  it('Should every post as unliked', () => {
    component.perPage = '4';
    component.postLiked = [];
    component.setLikes();
    expect(component.postLiked.length).toBe(4);
    for (let i = 0; i < +component.perPage; i++){
      expect(component.postLiked[i]).toBeFalse();
    }
  })

  it('Should get the comments for the selected post', fakeAsync(() => {
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

    const getCommentsSpy = spyOn(server, 'getComments').and.returnValue(of(comments));
    component.commentsOpened = [false, false];
    component.posts = posts
    component.openComments(1);
    expect(getCommentsSpy).toHaveBeenCalled();
    expect(component.comments).toEqual(comments);
    expect(component.commentsOpened[1]).toBeTrue();
  }))

  it('Should close comment section', () => {
    component.commentsOpened = [false, true];
    component.openComments(1);
    expect(component.commentsOpened[1]).toBeFalse();
  })

  it('Should publish a new comment', () => {
    const fakeForm: NgForm = <NgForm>{
      value: {
        name: 'name',
        email: 'email',
        comment: 'comment'
      }
    }
    const publishCommentSpy = spyOn(server, 'publishComment').and.callThrough()
    component.publishComment(fakeForm, 1, 1, 1);
    expect(publishCommentSpy).toHaveBeenCalled();
  })

  it('Should change the posts per page and reload the content', () => {
    const number = {
      detail: {
        value: '20'
      }
    }
    component.posts = [{
      body: 'body',
      id: 1,
      user_id: 1,
      title: 'title'}]
    const getContentSpy = spyOn(component, 'getContent')
    component.onSelectShowPosts(number);
    expect(component.perPage).toBe('20');
    expect(component.posts.length).toBe(0);
    expect(getContentSpy).toHaveBeenCalled();


  })

})
