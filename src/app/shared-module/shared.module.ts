import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppStore } from '../state_manahgement/appstore.service';
import { ImageUploadService } from '../services/image_upload.service';

@NgModule({
	imports: [ CommonModule, FormsModule, ReactiveFormsModule ],
	exports: [ CommonModule, ],
	declarations: [ ],
  providers:[]
})
export class SharedModule {}
