import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { Auth } from '../../core/services/auth';

@Directive({
  selector: '[appHasRole]'
})
export class HasRole {

  @Input('appHasRole') set role(roles: string[]){
    this.vcr.clear();
    const current = this.auth.currentUser?.role;
    if(current && roles.includes(current)){
      this.vcr.createEmbeddedView(this.tpl);
    }
  }

  constructor(
    private tpl : TemplateRef<any>,
    private vcr: ViewContainerRef,
    private auth: Auth
  ) { }

}
