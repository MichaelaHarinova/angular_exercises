import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BicolorButtonComponent } from './components';
import { ConvertToSpacesPipe } from './pipes';
import { StarComponent } from './star.component';

@NgModule({

  declarations: [
    //Components
    StarComponent,
    BicolorButtonComponent,
    //Pipes
    ConvertToSpacesPipe,
  ],

  exports: [
    //Components
    StarComponent,
    BicolorButtonComponent,
    //Pipes
    ConvertToSpacesPipe,
  ],

  imports: [CommonModule, FormsModule, MatSnackBarModule, MatTooltipModule],
})
export class SharedModule {}
