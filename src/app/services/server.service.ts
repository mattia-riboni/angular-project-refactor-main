import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(
    private http: HttpClient,
  ) { }

  TOKEN: string = '29a0acbcdcbada853286e365887df2232766560a57f178674bce26086cd94df1';
  headers: HttpHeaders = new HttpHeaders({'Authorization':  `Bearer ${this.TOKEN}`});
  requestOptions: object = {headers: this.headers};
  API_URL: string = 'https://gorest.co.in/public/v2/';

  getUsers(perPage: string): Observable<Object>{
    return this.http.get(this.API_URL +  `users?page=1&per_page=${perPage}`)
  }

  getPosts(page: string, perPage: string): Observable<Object>{
   return this.http.get(this.API_URL +  `posts?page=${page}&per_page=${perPage}`)
  }

  getUser(userId: string): Observable<Object>{
    return this.http.get(this.API_URL + `users/${userId}`, this.requestOptions)
  }

  getComments(userId: string): Observable<Object>{
    return this.http.get(this.API_URL + `posts/${userId}/comments`);
  }

  publishComment(name: any, comment: any, email: string, userId: number, postId: number): Observable<Object> {
    return this.http.post(this.API_URL + `posts/${postId}/comments`, {name: name, email: email, body: comment }, this.requestOptions)
  }

  createNewPost(userId: string, body: string, title: string,): Observable<Object> {
    return this.http.post(this.API_URL + `users/${userId}/posts`, {body: body, title: title}, this.requestOptions)
  }

  editUser(userId: string, name: string, email: string, gender: string): Observable<Object>{
    return this.http.put(this.API_URL + `users/${userId}`, {name: name, email: email, gender: gender}, this.requestOptions)
  }

  getUserPost(userId: string): Observable<Object>{
    return this.http.get(this.API_URL + `users/${userId}/posts`, this.requestOptions)
  }

  searchUserByName(name: string): Observable<Object>{
    return this.http.get(this.API_URL + `users?name=${name}`, this.requestOptions)
  }

  searchUserByEmail(email: string): Observable<Object>{
    return this.http.get(this.API_URL + `users?email=${email}`, this.requestOptions)
  }

  deleteUser(userId: string): Observable<Object> {
    return this.http.delete(this.API_URL + `users/${userId}`, this.requestOptions)
  }

  createNewUser(name: string, email: string, gender: string): Observable<Object>{
    return this.http.post(this.API_URL + `users`, {name: name, email: email, gender: gender, status: 'active'}, this.requestOptions)
  }
}
