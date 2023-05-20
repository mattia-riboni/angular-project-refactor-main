import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/models/logUser'
import { SignUp } from 'src/models/signup';
import { Login } from 'src/models/login';

@Injectable({
  providedIn: 'root'
})
export class AUTHService {

  isLoggedIn: boolean = false;
  user!: User | null;
  SIGNUP_URL: string = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCeoc9oK8lKlqTT57Gakx9dgNGSn3E4XT0';
  LOGIN_URL: string = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCeoc9oK8lKlqTT57Gakx9dgNGSn3E4XT0';

  constructor(private http: HttpClient) { }

  isAuthenticated(){
    return this.isLoggedIn
  };

  signUp(body: SignUp){
    return this.http.post(this.SIGNUP_URL, body)
  };

  login(body: Login){
    return this.http.post(this.LOGIN_URL, body);
  };

  createUser(email: string, id: string, token: string, expirationDate: Date){
    this.user = new User(email, id, token, expirationDate)
    this.isLoggedIn = true
  };

  logout(){
    this.isLoggedIn = false;
    this.user = null;
    localStorage.removeItem('user')
  }

}
