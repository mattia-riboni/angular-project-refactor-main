import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from './components/posts/posts.component';
import { UsersComponent } from './components/users/users.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './components/login/login.component';
import { AUTHGuard } from './auth.guard';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [
  { path: 'posts', component: PostsComponent, canActivate: [AUTHGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'users', component: UsersComponent, canActivate: [AUTHGuard]},
  { path: 'users/:id', component: UserDetailComponent, canActivate: [AUTHGuard] },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
