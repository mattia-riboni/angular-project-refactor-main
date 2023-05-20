import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServerService } from 'src/app/services/server.service';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit  {

constructor(
  private alertController: AlertController,
  private server: ServerService,
){ }


  ngOnInit(): void {
    this.getUsers();
  }

  creatingNewUser: boolean = false;
  deleting: boolean = false;
  users: any[] = []
  avatars: string[] = []
  perPage: string = '10';
  gender: string;




  getUsers(){
    this.server.getUsers(this.perPage).subscribe((users: any) => {
      this.users = users;
      this.setAvatars(users.length);
    })
  }

  createUser(){
    this.creatingNewUser = !this.creatingNewUser;
  }

  showDelete(){
    this.deleting = !this.deleting
  }

  onSelectShowUsers(number: any){
    this.perPage = number.detail.value;
    this.getUsers();
  }

  createNewUser(form: NgForm){
    const name: string = form.value.firstName.trim() + ' ' + form.value.lastName.trim()
    this.server.createNewUser(name, form.value.email, this.gender).subscribe((res) => {
      this.presentAlert(name, 'Done', 'Created')
      this.server.searchUserByName(name).subscribe((user: any) => {
        this.avatars.push(`https://i.pravatar.cc/210`)
        this.users.push(user[0])
      })
    }, (e) => {
      this.presentAlert(e.error[0].field, 'Error', e.error[0].message);
      console.log(e)
    })
  }

  onSelectGender(gender: any){
    this.gender = gender.detail.value;
  }

  deleteUser(userId: string, name: string, index: number){ //testare
    this.server.deleteUser(userId).subscribe(() => {
      this.presentAlert(name, 'Done', 'Deleted')
      this.users.splice(index, 1)
    }, (e) => {
      this.presentAlert(name, 'Error', e.message)
    })
  }

  setAvatars(length: number){
    for (let i = 0; i < length; i++){
      this.avatars.push(`https://i.pravatar.cc/${200 + i}`)
    }
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
