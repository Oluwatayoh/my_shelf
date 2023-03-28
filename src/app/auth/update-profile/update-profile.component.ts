import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { concatMap, switchMap } from 'rxjs';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auuth.service';
import { ImageUploadService } from 'src/app/services/image_upload.service';
import { AppStore } from 'src/app/state_manahgement/appstore.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss'],
})
export class UpdateProfileComponent implements OnInit {
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  userData: any = {};
  email: string =''

  constructor(
    public appStore: AppStore,
    private imageUploadService: ImageUploadService,
    private authService: AuthService
  ) {

    // this.appStore.getUserState().subscribe((e) => (this.userData = e));
    this.userData = JSON.parse(localStorage.getItem('user')!);
  }

  ngOnInit(): void {
  }

  close_onClick() {
    this.closeModal.emit(true);
  }



  saveProfile() {
    console.log(this.userData.displayName)
    this.authService
      .updateUser(this.userData);
      this.authService.getUser();
      this.close_onClick();
  }
}
