import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// import {
//   NgxUiLoaderModule,
//   NgxUiLoaderRouterModule,
//   NgxUiLoaderHttpModule,
//   NgxUiLoaderConfig, POSITION, SPINNER, PB_DIRECTION
// } from 'ngx-ui-loader';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared-module/material-module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routing } from './app-routing.module';
import { BookshelfComponent } from './bookshelf/bookshelf.component';
import { NewCategoryComponent } from './bookshelf/new-category/new-category.component';
import { NewBookComponent } from './bookshelf/new-book/new-book.component';



// const ngxUiLoaderConfig: NgxUiLoaderConfig = {
//   bgsColor: 'red',
//   bgsPosition: POSITION.bottomCenter,
//   bgsSize: 40,
//   bgsType: SPINNER.rectangleBounce, // background spinner type
//   fgsType: SPINNER.chasingDots, // foreground spinner type
//   pbDirection: PB_DIRECTION.leftToRight, // progress bar direction
//   pbThickness: 5, // progress bar thickness
// };


@NgModule({
  declarations: [
    AppComponent,
    BookshelfComponent,
    NewCategoryComponent,
    NewBookComponent
  ],
  imports: [
    BrowserModule,
    Routing,
    BrowserAnimationsModule,
    MaterialModule,
    // NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    // NgxUiLoaderRouterModule,
    // NgxUiLoaderHttpModule,
    HttpClientModule, FormsModule, ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
