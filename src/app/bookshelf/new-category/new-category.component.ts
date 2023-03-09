import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ShelfService } from 'src/app/services/shelf.service';
import { IShelf } from 'src/app/models/shelf';
import swal from 'sweetalert2';
import Swal from 'sweetalert2';
import { IBooks } from 'src/app/models/books';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.scss'],
})
export class NewCategoryComponent implements OnInit {
  @Input() selectedCategory: any;
  @Input() isNew!: boolean;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() updatedCategory: EventEmitter<any> = new EventEmitter<any>();

  categoryForm!: FormGroup;
  category: any = <any>{};
  subscription: Subscription = new Subscription();

  static formControls = () => {
    return {
      categoryName: ['', [<any>Validators.required, Validators.minLength(3)]],
      books: [[], []],
    };
  };

  constructor(
    private _formBuilder: FormBuilder,
    private _shelfService: ShelfService
  ) {}

  ngOnInit() {
    this.categoryForm = this._formBuilder.group(
      NewCategoryComponent.formControls()
    );
    if (this.selectedCategory && !this.isNew) {
      this.categoryForm.patchValue(this.selectedCategory);
    }
  }

  randomID() {
    var text = '';
    var possible = 'ABCDYHHHasds88466w';
    for (var i = 0; i < 10; i++)
      text += possible.charAt(Math.random() * possible.length);

    return text;
  }

  onSaveCategory() {
    const categoryModel = <IShelf><unknown>{
      categoryName: this.categoryForm.controls['categoryName'].value,
      books: [],
      id: this.randomID
    };

    this.subscription = this._shelfService
      .postCategory(categoryModel)
      .subscribe(
        (payload) => {
          Swal.fire({
            icon: 'success',
            title: 'Category Saved Successfully',
            showCancelButton: false,
            timer: 1500,
          });
          console.log(payload);
          this.close_onClick();
        },
        (error) => {
          Swal.fire({
            icon: 'warning',
            title: 'Error Occur while saving',
            showConfirmButton: false,
            timer: 1500,
          });
          this.close_onClick();
        }
      );
  }

  public onUpdateCategory() {
    const categoryModel = <IShelf>{
      categoryName: this.categoryForm.controls['categoryName'].value,
      id: this.selectedCategory.id,
      books:this.selectedCategory.books
    };

    this.subscription = this._shelfService
      .updateCategory(this.selectedCategory.id, categoryModel)
      .subscribe(
        (payload) => {
          Swal.fire({
            icon: 'success',
            title: 'Update Saved Successfully',
            showCancelButton: false,
            timer: 1500,
          });
          console.log(payload);
          this.updatedCategory.emit(payload);
          this.close_onClick();
        },
        (error) => {
          Swal.fire({
            icon: 'warning',
            title: 'Error Occur while updating record',
            showConfirmButton: false,
            timer: 1500,
          });
          this.close_onClick();
        }
      );
  }

  close_onClick() {
    this.closeModal.emit(true);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
