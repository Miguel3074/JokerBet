import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BodyComponent } from './body.component';

@NgModule({
  declarations: [BodyComponent],
  imports: [CommonModule, RouterModule],
  exports: [BodyComponent]
})
export class BodyModule {}
