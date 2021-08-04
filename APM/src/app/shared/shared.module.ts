import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { ChartsModule } from "ng2-charts";
import { BicolorButtonComponent } from "./components/bicolor-button/bicolor-button.component";
import { ConvertToSpacesPipe } from "./pipes/convert-to-spaces.pipe";
import { StarComponent } from "./components/star/star.component";
import { BubbleChartComponent } from "./components/charts/bubble-chart/bubble-chart.component";
import { BarChartComponent } from "./components/charts/bar-chart/bar-chart.component";

@NgModule({
	declarations: [
		// Components
		StarComponent,
		BicolorButtonComponent,
		BubbleChartComponent,
		BarChartComponent,

		// Pipes
		ConvertToSpacesPipe
	],

	exports: [
		// Components
		StarComponent,
		BicolorButtonComponent,
		BubbleChartComponent,
		BarChartComponent,

		// Pipes
		ConvertToSpacesPipe
	],

	imports: [
		CommonModule,
		FormsModule,
		MatSnackBarModule,
		MatTooltipModule,
		ChartsModule
	]
})
export class SharedModule {}
