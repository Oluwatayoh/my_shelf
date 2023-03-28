import { Component, OnInit } from '@angular/core';
import { ShelfService } from '../services/shelf.service';
import { Subscription } from 'rxjs';
import { IShelf } from '../models/shelf';

import swal from 'sweetalert2';
import { IBooks } from '../models/books';
import { AppStore } from '../state_manahgement/appstore.service';
import { AuthService } from '../services/auuth.service';

@Component({
  selector: 'app-bookshelf',
  templateUrl: './bookshelf.component.html',
  styleUrls: ['./bookshelf.component.scss'],
})
export class BookshelfComponent implements OnInit {
  categories: any[] = [];
  books: IBooks[] = [];
  // books: any = [];
  selectedCategory!: IShelf;
  selectedBook!: IBooks;
  subscription: Subscription = new Subscription();

  categoryListEmpty = false;
  categoryListShow = true;
  newBook = false;
  bookshow = false;
  updateProfile = false;
  bookButton = false;
  newCategory = false;
  isNew = false;
  isNewBook = false;
  empty = '';
  time: any;
  constructor(
    private _shelfService: ShelfService,
    private authService: AuthService,
    public appStore: AppStore
  ) {}

  ngOnInit() {
    this.getCategory();
  }

  logout() {
    this.authService.SignOut();
  }

  private getCategory() {
    this._shelfService.getAll().subscribe((e) => {
      this.categories = e;
    });
    this.selectedCategory = this.categories[0];
  }

  close_onClick(e: any) {
    this.newCategory = false;
    this.newBook = false;
    this.updateProfile = false;
    this.getCategory();
  }

  showupdateProfile() {
    this.updateProfile = true;
  }

  onSelectedCategory(category: any) {
    this.selectedCategory = category;
    const date = JSON.stringify(this.selectedCategory.dateadded);
    var dd = JSON.parse(date);
    this.time = new Date(dd.seconds * 1000);
    this.bookshow = true;
  }

  goToLink(url: any) {
    window.open(url, '_blank');
  }

  onShowAddNewBook(book: any, isNew?: boolean) {
    isNew === true ? (this.isNewBook = true) : (this.isNewBook = false);
    this.selectedBook = book;
    this.newBook = true;
  }

  onShowNewCategory(category?: any, index?: number, isNew?: boolean) {
    isNew === true ? (this.isNew = true) : (this.isNew = false);

    if ((index || index === 0) && category) {
      this.selectedCategory = category;
      // this.selectedCategory[index] = index;
    } else {
      this.selectedCategory;
    }
    console.log(category);
    this.newCategory = true;
    this.bookButton = true;
    this.categoryListEmpty = false;
    this.categoryListShow = true;
  }

  onDeleteCategory(value: any) {
    swal
      .fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      })
      .then((result) => {
        if (result.value) {
          this._shelfService.delete(value);
          this.bookshow=false;
          this.getCategory();
          swal.fire('Deleted!', 'Your file has been deleted.', 'success');
        }
      });
  }

 
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
