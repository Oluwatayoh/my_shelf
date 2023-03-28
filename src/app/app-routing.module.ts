import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { SigninComponent } from './auth/signin/signin.component';
import { BookshelfComponent } from './bookshelf/bookshelf.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: SigninComponent },
      {
        path: 'bookshelf',
        component: BookshelfComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
];

export const Routing = RouterModule.forRoot(routes, { useHash: true });
