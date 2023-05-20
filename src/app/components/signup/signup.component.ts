import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AUTHService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  constructor(
    private authService: AUTHService,
    private route: Router,
    ){}


  onSubmit(form: NgForm){
    const email = form.value.email;
    const password = form.value.password;


    this.authService.signUp({email: email, password: password, returnSecureToken: true})
    .subscribe((data: any) => {
      this.route.navigate(['/login']);
    }, () =>{
      alert('Error')
      form.reset();
    })
  }

}
