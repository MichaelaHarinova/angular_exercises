import { Component } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
	selector: "pm-snack-bar",
	templateUrl: "./snack-bar.component.html",
	styleUrls: ["./snack-bar.component.css"]
})
export class SnackBarComponent {
	durationInSeconds = 3;

	constructor(private _snackBar: MatSnackBar) {}

	openSnackBar(message: string, action: string) {
		this._snackBar.open(message, action, {
			duration: this.durationInSeconds * 1000
		});
	}
}
