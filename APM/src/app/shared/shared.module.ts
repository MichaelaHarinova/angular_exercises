import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StarComponent} from "./star.component";
import {FormsModule} from "@angular/forms";
import {BicolorButtonComponent} from "./bicolor-button.component";

@NgModule({
  declarations: [
    StarComponent,
    BicolorButtonComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    StarComponent,
    BicolorButtonComponent
  ]
})
export class SharedModule { }
