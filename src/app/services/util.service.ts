import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
// import { ToastrService } from 'ngx-toastr';
import swal from 'sweetalert2';

// import $ from 'jquery';
declare var $: any;

@Injectable()
export class UtilityService {
  constructor() {}

  showLoading(): void {
    $('#loading-overlay').show();
  }

  hideLoading(): void {
    $('#loading-overlay').hide();
  }

}
