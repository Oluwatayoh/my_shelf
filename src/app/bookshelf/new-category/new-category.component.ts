import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ShelfService } from 'src/app/services/shelf.service';
import { initialShelf, IShelf } from 'src/app/models/shelf';
import swal from 'sweetalert2';
import Swal from 'sweetalert2';
import { IBooks } from 'src/app/models/books';
import { UtilityService } from 'src/app/services/util.service';
import {
  Storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from '@angular/fire/storage';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.scss'],
})
export class NewCategoryComponent implements OnInit {
  @Input() selectedCategory?: IShelf;
  @Input() isNew!: boolean;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() updatedCategory: EventEmitter<any> = new EventEmitter<any>();

  category: any = <any>{};
  subscription: Subscription = new Subscription();
  shelf?: IShelf;

  public file?: File;
  fileUrl = '';

  constructor(
    private _shelfService: ShelfService,
    private utilService: UtilityService,
    public storage: Storage
  ) {}

  ngOnInit() {
    if (this.selectedCategory && !this.isNew) {
      this.shelf = this.selectedCategory;
      // this.categoryForm.patchValue(this.selectedCategory);
    } else {
      this.shelf = initialShelf;
    }

    console.log(this.selectedCategory);
  }

  onChanged(event: any) {
    console.log(event.target.files);
    this.file = event.target.files[0];
  }

  randomID() {
    var text = '';
    var possible = 'ABCDYHHHasds88466w';
    for (var i = 0; i < 10; i++)
      text += possible.charAt(Math.random() * possible.length);

    return text;
  }

  uploadFile(): void {
    const storageRef = ref(
      this.storage,
      'doc/' + `${this.shelf?.title}${this.file!.name}`
    );
    const uploadTask = uploadBytesResumable(storageRef, this.file!);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            Swal.fire({
              icon: 'warning',
              title: "User doesn't have permission to access the object",
              showConfirmButton: false,
              timer: 1500,
            });
            break;
          case 'storage/canceled':
            Swal.fire({
              icon: 'warning',
              title: 'User canceled the upload',
              showConfirmButton: false,
              timer: 1500,
            });
            // User canceled the upload
            break;

          // ...

          case 'storage/unknown':
            Swal.fire({
              icon: 'warning',
              title: 'Unknown error occurred, inspect error.serverResponse',
              showConfirmButton: false,
              timer: 1500,
            });
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          this.shelf!.imageUrl = downloadURL;
          this.shelf!.uid = this.randomID();
          this.isNew == true
            ? this._shelfService.create(this.shelf!)
            : this._shelfService.update(this.shelf!);
          this.shelf = initialShelf;
          this.close_onClick();
        });
      }
    );
  }

  onSaveCategory(): void {
    this.utilService.showLoading;
    if (this.file != null) {
      this.uploadFile();
    } else {
      this.shelf!.imageUrl = '';
      this.shelf!.uid = this.randomID();
      this._shelfService.create(this.shelf!);
      this.shelf = initialShelf;
      this.close_onClick();
    }
  }

  public onUpdateCategory() {
    this.utilService.showLoading;
    if (this.file != null) {
      this.uploadFile();
    } else {
      this.shelf!.imageUrl = this.selectedCategory?.imageUrl;
      this._shelfService.update(this.shelf!);
      this.shelf = initialShelf;
      this.close_onClick();
    }
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
