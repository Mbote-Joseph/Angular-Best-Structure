import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { tokenInterceptor } from './interceptors/token-interceptor';



@NgModule({
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: tokenInterceptor, multi: true}
  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parent: CoreModule){
    if(parent) throw new Error('CoreModule should only be imported once')
  }
}
