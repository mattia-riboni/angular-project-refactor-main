import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ServerService } from 'src/app/services/server.service';
import { post } from 'src/models/post';
import { comment } from 'src/models/comment';
import { NgForm } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit, OnChanges {

  @Input() userId: string;
  @Input() name: string;
  @Input() refreshCount: number;

  constructor(
    private server: ServerService,
  ){ }

  posts: post[];
  page: string = '1';
  perPage: string = '10' ;
  imgs: string[] = [];
  names: string[] = [];
  avatars: string[] = [];
  bodyOpened: boolean[] = [];
  comments: comment[] = [];
  postLiked: boolean[] = [];
  commentsOpened: boolean[] = [];
  commentAvatar: string[] = [];

  ngOnInit(): void {
    this.getContent();
  }

  ngOnChanges(): void {
    this.posts = [];
    this.imgs = [];
    this.names = [];
    this.getContent();
  }

  getContent(): void{
    //If the user is in the home page he visualize random posts
    if (!this.userId){
      this.server.getPosts(this.page, this.perPage).subscribe((res: any) => {
        this.posts = res;
        this.getPostOwnerInfo();
        this.getImgs();
        this.setLikes();
        this.setPostsClosed();
        this.setCommentsClosed();
      })
      //Down here the user is in the user detail section
    } else {
      this.server.getUserPost(this.userId.toString()).subscribe((res: any) => {

        if (res.length == 0){
          this.posts = [{
            title: 'No posts',
            body: 'This user has 0 posts published',
            user_id: 0,
            id: 0,
          }];
          this.names.push(this.name)
          this.imgs.push('https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png');
          this.avatars.push(`https://i.pravatar.cc/200`);
        } else {
          this.posts = res;
          let avatarSrc: string = `https://i.pravatar.cc/200`;
          for (let i = 0; i < this.posts.length; i++){
            this.bodyOpened[i] = false;
            this.postLiked.push(false)
            this.commentsOpened.push(false)
            this.avatars.push(avatarSrc);
            let imgSrc: string =  `https://picsum.photos/${i + 500}/${i + 300}`;
            this.imgs.push(imgSrc);
            this.names.push(this.name)
          }
        }
      })
    }
  }

  getPostOwnerInfo(): void{
    for (let i = 0; i < +this.perPage ; i++){
      let userId: string = this.posts[i].user_id.toString();
      this.server.getUser(userId).subscribe((user: any) => {
        this.names.push(user.name);
        let avatarSrc: string = `https://i.pravatar.cc/${200 + i}`;
        this.avatars.push(avatarSrc);
      }, () => {
        this.names.push("User Deleted")
        this.avatars.push("https://img.icons8.com/officel/40/null/remove-user-male.png")
      })
    }
  }

  getImgs(): void{
    for (let i = 0; i < +this.perPage; i++){
      let imgSrc: string =  `https://picsum.photos/${i + 500}/${i + 300}`;
      this.imgs.push(imgSrc);
    }
  }

  setPostsClosed(): void{
    for (let i = 0; i < +this.perPage; i++){
      this.bodyOpened[i] = false;
    }
  }

  setCommentsClosed(): void{
    this.commentsOpened = [];
    for (let i = 0; i < +this.perPage; i++){
      this.commentsOpened.push(false)
    }
  }

  like(index: number): void{
    this.postLiked[index] = !this.postLiked[index];
  }

  setLikes(): void{
    for (let i = 0; i < +this.perPage; i++){
      this.postLiked.push(false)
    }
  }

  openComments(index: number): void{
    if (this.commentsOpened[index] == false ){
      this.setCommentsClosed();
      this.server.getComments(this.posts[index].id.toString()).subscribe((res: any) => {
        this.comments = res;
        this.getCommentAvatar(res.length);
        this.commentsOpened[index] = !this.commentsOpened[index]
      });
    }  else {
      this.commentsOpened[index] = false;
    }
  }

  getCommentAvatar(length: number): void{
    this.commentAvatar = [];
    for (let i = 0; i < length; i++){
      this.commentAvatar.push(`https://i.pravatar.cc/${200 + ( 3 * i)}`);
    }
  }

  showBody(index: number): void{
    this.bodyOpened[index] = ! this.bodyOpened[index];
  }

  publishComment(form: NgForm, userId: number, postId: number, index: number): void{
    const name = form.value.name;
    const email = form.value.email;
    const comment = form.value.comment;
    this.server.publishComment(name, comment, email, userId, postId).subscribe(() => {
      this.comments.push({name: name, body: comment, email, id: userId, post_id: postId})
      let avatarSrc: string = `https://i.pravatar.cc/200`;
      this.commentAvatar.push(avatarSrc);
      form.reset();
    }, (e) => {
      alert(e)
    })

  }

  //PAGINATOR

  onSelectShowPosts(number: any): void{
    this.perPage = number.detail.value;
    this.posts = [];
    this.getContent();
  }



}
