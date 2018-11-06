
import {NgModule} from '@angular/core';
import { TypeReformPipe } from './pipe/type-reform.pipe';
import { MapPipe } from './pipe/map.pipe';
import {StateReformPipe} from './pipe/otherhousetype.pipe';
import { SetUeditorDirective } from './set-ueditor.directive';
import { HtmlPipe } from './pipe/html.pipe';
import { AuthBtuDirective } from './auth-btu.directive';
import { DisabledDirective } from './disabled.directive';

@NgModule({
  exports: [
    TypeReformPipe,
    MapPipe,
    StateReformPipe,
    SetUeditorDirective,
    HtmlPipe,
    AuthBtuDirective,
    DisabledDirective
  ],
  declarations: [
    TypeReformPipe,
    MapPipe,
    StateReformPipe,
    SetUeditorDirective,
    HtmlPipe,
    AuthBtuDirective,
    DisabledDirective
  ]
})
export class DirectivesModule {
}
