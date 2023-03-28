import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User, initialState } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AppStore {
  public userState$ = new BehaviorSubject<any>({});


  setUserState(newState: any): void {
    this.userState$.next(newState);
  }

  getUserState(): Observable<User> {
    return this.userState$.asObservable();
  }

}
