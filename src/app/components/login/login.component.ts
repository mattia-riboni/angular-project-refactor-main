import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AUTHService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AUTHService,
    private router: Router,
  ){ }

  ngOnInit(): void {
    if (localStorage.getItem('user')){
      this.router.navigate(['/posts'])
    }
  }

  onSubmit(form: NgForm){
    const email = form.value.email;
    const password = form.value.password;

    this.authService.login({email: email, password: password, returnSecureToken: true}).subscribe((data: any) =>{
      const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000);
      this.authService.createUser(data.email, data.localId, data.idToken, expirationDate);
      localStorage.setItem('user', JSON.stringify(this.authService.user));
      this.router.navigate(['/posts'], { queryParams: {logged: true}})
    }, () => {
      this.resetForm(form);
      alert('Email or password not correct')
    })
  };

  resetForm(form: NgForm): boolean{
    form.reset();
    let resetted = true;
    return resetted;
  }

}
