import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { IShelf } from '../models/shelf';
import { Observable, Subject } from 'rxjs';
import { tap, retry, catchError } from 'rxjs/operators';
import { IBooks } from '../models/books';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UtilityService } from './util.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class ShelfService {
  private dbPath = '/books';
  shelfRef!: AngularFireList<IShelf>;
  private options = {
    headers: new HttpHeaders().set('Content-Type', 'application/json'),
  };
  private _url = 'http://localhost:3000';

  private id: string = '';

  constructor(
    private http: HttpClient,
    private db: AngularFireDatabase,
    private fs: AngularFirestore,
    private utilService: UtilityService
  ) {
    this.shelfRef = db.list(this.dbPath);
  }

  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }

  getAll() {
    return this.fs.collection('books').valueChanges();
  }

  create(shelf: IShelf): any {
    this.fs
      .collection(this.dbPath)
      .add(shelf)
      .then(() => {
        this.utilService.hideLoading();
        Swal.fire({
          icon: 'success',
          title: 'Book Saved Successfully',
          showCancelButton: false,
          timer: 1500,
        });
      });
  }

  update(value: any) {
    const docRef = this.fs.collection(this.dbPath, (ref) =>
      ref.where('uid', '==', value.uid)
    );
    docRef
      .snapshotChanges()
      .forEach((changes) => {
        changes.map((a) => {
          this.id = a.payload.doc.id;
        });
        this.fs.collection(this.dbPath).doc(this.id).update(value);
      })
      .then((e) => {
        this.utilService.hideLoading();
        Swal.fire({
          icon: 'success',
          title: 'Book Updated Successfully',
          showCancelButton: false,
          timer: 1500,
        });
      });
  }

  delete(value: any) {
    const docRef = this.fs.collection(this.dbPath, (ref) =>
      ref.where('uid', '==', value.uid)
    );
    docRef.snapshotChanges().forEach((changes) => {
      changes.map((a) => {
        this.id = a.payload.doc.id;
      });

      console.log(this.id);
      this.fs.collection(this.dbPath).doc(this.id).delete();
    }).then((e)=>{
      this.utilService.hideLoading();
     
    });
  }

  deleteAll(): Promise<void> {
    return this.shelfRef.remove();
  }

}
