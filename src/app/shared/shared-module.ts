import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TruncatePipe } from './pipes/truncate-pipe';
import { HasRole } from './directives/has-role';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TruncatePipe,
    HasRole
  ],
  exports: [
    CommonModule,
    TruncatePipe,
    HasRole
  ]
})
export class SharedModule { }
