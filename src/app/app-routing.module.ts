import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { BookshelfComponent } from './bookshelf/bookshelf.component';

const routes: Routes = [
    {
        path: '', component: AppComponent,
        children: [
            { path: '', redirectTo: 'bookshelf', pathMatch: 'full' },
            { path: 'bookshelf', component: BookshelfComponent },           
        ]
    }
];


export const Routing = RouterModule.forRoot(routes, { useHash: true });

