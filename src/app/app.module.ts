import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared-module/material-module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routing } from './app-routing.module';
import { BookshelfComponent } from './bookshelf/bookshelf.component';
import { NewCategoryComponent } from './bookshelf/new-category/new-category.component';
import { NewBookComponent } from './bookshelf/new-book/new-book.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { SigninComponent } from './auth/signin/signin.component';
import { TextInputComponent } from './components /text-input/text-input.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthService } from './services/auuth.service';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { UtilityService } from './services/util.service';
import { LoaderComponent } from './components /loader/loader.component';
import { UpdateProfileComponent } from './auth/update-profile/update-profile.component';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { ImageUploadService } from './services/image_upload.service';
import { AppStore } from './state_manahgement/appstore.service';
import { getStorage, provideStorage } from '@angular/fire/storage';

@NgModule({
  declarations: [
    AppComponent,
    BookshelfComponent,
    NewCategoryComponent,
    NewBookComponent,
    SigninComponent,
    TextInputComponent,
    LoaderComponent,
    UpdateProfileComponent
  ],
  imports: [
    BrowserModule,
    Routing,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule, FormsModule, ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
provideFirebaseApp(() => initializeApp(environment.firebase)),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    FontAwesomeModule,
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [AuthService, UtilityService, AppStore, ImageUploadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
