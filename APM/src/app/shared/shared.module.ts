import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { BicolorButtonComponent } from "./components/bicolor-button/bicolor-button.component";
import { ConvertToSpacesPipe } from "./pipes/convert-to-spaces.pipe";
import { StarComponent } from "./components/star/star.component";

@NgModule({
	declarations: [
		// Components
		StarComponent,
		BicolorButtonComponent,
		// Pipes
		ConvertToSpacesPipe
	],

	exports: [
		// Components
		StarComponent,
		BicolorButtonComponent,
		// Pipes
		ConvertToSpacesPipe
	],

	imports: [CommonModule, FormsModule, MatSnackBarModule, MatTooltipModule]
})
export class SharedModule {}