import { Component, OnInit } from '@angular/core';
import { ShelfService } from '../services/shelf.service';
import { Subscription } from 'rxjs';
import { IShelf } from '../models/shelf';

import swal from 'sweetalert2';
import { IBooks } from '../models/books';

@Component({
  selector: 'app-bookshelf',
  templateUrl: './bookshelf.component.html',
  styleUrls: ['./bookshelf.component.scss'],
})
export class BookshelfComponent implements OnInit {
  categories: IShelf[] = [];
  books: IBooks[] = [];
  // books: any = [];
  selectedCategory!: IShelf;
  selectedBook!: IBooks;
  subscription: Subscription = new Subscription();

  categoryListEmpty = false;
  categoryListShow = true;
  newBook = false;
  bookshow = false;
  bookButton = false;
  newCategory = false;
  isNew = false;
  isNewBook = false;

  constructor(private _shelfService: ShelfService) {}

  ngOnInit() {
    this.getCategory();
  }

  private getCategory() {
    this.subscription = this._shelfService
      .getCategory()
      .subscribe((data) => (this.categories = data));
    this.selectedCategory = this.categories[0];
    console.log(this.categories);
  }

  close_onClick(e: any) {
    this.newCategory = false;
    this.newBook = false;
    this.getCategory();
    this.getBooksbyCategoryId();
  }

  private getBooksbyCategoryId() {
    // get books by categoryid
    this.subscription = this._shelfService
      .getByCategoryId(this.selectedCategory.id)
      .subscribe((data) => (this.books = data.books));
    console.log(this.books);
  }

  onSelectedCategory(category: any) {
    this.selectedCategory = category;
    this.getBooksbyCategoryId();
    this.bookshow = true;
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
      console.log(category);
    } else {
      this.selectedCategory;
    }
    this.newCategory = true;
    this.bookButton = true;
    this.categoryListEmpty = false;
    this.categoryListShow = true;
  }

  onDeleteCategory(id: number) {
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
          this._shelfService.deleteCategory(id).subscribe((data) => {
            this.getCategory();
          });
          swal.fire('Deleted!', 'Your file has been deleted.', 'success');
        }
      });
  }

  onDeleteBook(bookId: any) {
    swal
      .fire({
        title: 'Are you sure you want to delete this book?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      })
      .then((result) => {
        if (result.value) {
          let res = this.books.filter((obj) => obj.bookId !== bookId);
          this.selectedCategory.books = res;
          this._shelfService
            .updateCategory(this.selectedCategory.id, this.selectedCategory)
            .subscribe(
              (payload) => {
                this.getBooksbyCategoryId();
                swal.fire('Deleted!', 'Your file has been deleted.', 'success');
              },
              (error) => {
                swal.fire({
                  icon: 'warning',
                  title: 'Error Occur while registering',
                  showConfirmButton: false,
                  timer: 1500,
                });
              }
            );
        }
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
