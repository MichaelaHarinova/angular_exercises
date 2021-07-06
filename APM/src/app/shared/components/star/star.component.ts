import {
	Component,
	OnChanges,
	Input,
	Output,
	EventEmitter
} from "@angular/core";

@Component({
	selector: "pm-star",
	templateUrl: "./star.component.html",
	styleUrls: ["./star.component.css"]
})
export class StarComponent implements OnChanges {
	cropWidth = 75;
	@Input() rating = 0;
	@Output() ratingClicked: EventEmitter<string> = new EventEmitter<string>();

	ngOnChanges(): void {
		this.cropWidth = (this.rating * 75) / 5;
	}

	onClick(): void {
		this.ratingClicked.emit(`The rating ${this.rating} was clicked!`);
	}
}