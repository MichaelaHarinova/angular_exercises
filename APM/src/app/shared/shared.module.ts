import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StarComponent} from "./star.component";
import {FormsModule} from "@angular/forms";
import {BicolorButtonComponent} from "./bicolor-button.component";
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSnackBarModule} from '@angular/material/snack-bar';

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
    BicolorButtonComponent,
    MatTooltipModule,
    MatSnackBarModule
  ]
})
export class SharedModule {
}
