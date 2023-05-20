import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ServerService } from 'src/app/services/server.service';
import { User } from 'src/models/user';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AUTHService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

constructor(
  private route: ActivatedRoute,
  private server: ServerService,
  private alertController: AlertController,
  private router: Router,
  private authService: AUTHService,
) { }

  userId: string;
  user: User;
  avatar: string = `https://i.pravatar.cc/200`;
  newPostOpened: boolean = false;
  editingUserOpened: boolean = false;
  editingPostsOpened: boolean = false;
  gender: string;
  refreshPostsCount: number;
  name: string = '';
  email: string = '';



  public alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
      },
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: () => {
        this.server.deleteUser(this.userId).subscribe(() => {
          this.presentAlert(this.user.name, 'Done', 'Deleted');
          this.router.navigateByUrl('/users');
        }, (e) => {
          this.presentAlert(this.user.name, 'Error', e)
        })
      },
    },
  ];


  ngOnInit(): void {
    if (localStorage.getItem('user')){
      const user = JSON.parse(localStorage.getItem('user')!);
      this.authService.createUser(user.email, user.id, user._token, user._expirationDate);
      this.userId = this.route.snapshot.paramMap.get('id');
      this.getUser()
    }
  }

  getUser(){
    this.server.getUser(this.userId).subscribe((user: any) => {
      this.user = user;
      this.name = user.name;
      this.email = user.email;
      console.log(this.user)
    })
  }

  newPost(){
    this.newPostOpened = !this.newPostOpened
    this.editingUserOpened = false;
    this.editingPostsOpened = false;
  }

  editingUser(){
    this.editingUserOpened = !this.editingUserOpened;
    this.newPostOpened = false;
    this.editingPostsOpened = false;
  }

  createNewPost(form: NgForm){
    this.server.createNewPost(this.user.id.toString(), form.value.body, form.value.title).subscribe(() => {
      this.presentAlert(this.user.name, 'done', 'post created');
      this.refreshPosts();
    }, (e) => {
      this.presentAlert(this.user.name, 'Error', e.message)
    })
  }

  refreshPosts(){
    this.refreshPostsCount++;
  }

  editUser(form: NgForm){
    this.server.editUser(this.userId, form.value.firstName, form.value.email, this.gender).subscribe(() => {
      this.presentAlert(this.user.name, 'done', 'user updated');
      window.location.reload();
    },(e) => {
      this.presentAlert(this.user.name, 'Error', e.message )
    })
  }

  onChangeGender(gender: any){
    this.gender = gender.detail.value;
  }

  async presentAlert(user: string, subHeader: string, message:string) {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: `${subHeader}`,
      message: `${user} ${message}`,
      buttons: ['OK'],
    });

    await alert.present();
  }





}
