import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, Event } from '@angular/router';
import { AUTHService } from 'src/app/services/auth.service';
import { ServerService } from 'src/app/services/server.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent {
  constructor(
    private server: ServerService,
    private router: Router,
    private authService: AUTHService,
    private route: ActivatedRoute ){
      this.router.events.subscribe((event: Event) => {
        if (event instanceof NavigationEnd) {
            this.logged();
        }
    });

    }

  isLogged!: boolean
  email: string = '';

  ngOnInit(){
    this.logged()
    const user = JSON.parse(localStorage.getItem('user'));
    this.email = user.email;
  }

  ngOnChanges(){
    this.logged();
  }

  logout(){
    this.email = '';
    this.authService.logout()
    this.router.navigate(['/login'])
    this.isLogged = false
  };

  log(){
    this.router.navigate(['/login']);
  }

  goHome(){
    this.router.navigateByUrl('/posts')
  }

  goUsers(){
    this.router.navigateByUrl('/users')

  }


  searchUser(input: string){
    this.server.searchUserByName(input).subscribe((user: any) => {
      console.log(input)
      console.log(user);
      if (user.length == 0){
        this.server.searchUserByEmail(input).subscribe((user: any) => {
          console.log(user)
          if (user.length == 0){
            this.router.navigateByUrl('/not-found')
          } else {
            this.router.navigate(
              [`/users/${user[0].id}`])
          }
        })
      } else {
        this.router.navigate(
          [`/users/${user[0].id}`])
      }
    })
  }

  logged(){
    this.route.params.subscribe((params: any) => {
     if (localStorage.getItem('user') || params['logged']){
      return this.isLogged = true
     } else {
      return this.isLogged = false
     }
    })
  }
}
