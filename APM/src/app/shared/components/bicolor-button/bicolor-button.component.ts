import {
	Component,
	EventEmitter,
	Input,
	OnChanges,
	Output
} from "@angular/core";

@Component({
	selector: "pm-bicolor-button",
	templateUrl: "./bicolor-button.component.html",
	styleUrls: ["./bicolor-button.component.css"]
})
export class BicolorButtonComponent implements OnChanges {
	@Input() textColor = "#000000";
	buttonColor = "";
	buttonPrimary = "#309880";
	buttonSecondary = "#055c48";
	@Input() buttonText = "Try me out!";
	@Input() buttonActive!: boolean;

	@Output() buttonClicked: EventEmitter<string> = new EventEmitter<string>();

	constructor() {}

	ngOnChanges(): void {
		if (this.buttonActive) {
			this.buttonColor = this.buttonPrimary;
		} else {
			this.buttonColor = this.buttonSecondary;
		}
	}

	onClick(): void {
		this.buttonClicked.emit();
	}
}
