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
	@Input() maxDivWidth!: number;
	@Input() rating = 0;
	@Input() color = "green";
	@Input() starSize!: number;
	@Input() label = "Star";
	@Output() ratingClicked: EventEmitter<string> = new EventEmitter<string>();

	ngOnChanges(): void {
		this.cropWidth = (this.rating * this.maxDivWidth) / 5;
	}

	onClick(): void {
		this.ratingClicked.emit(`The rating ${this.rating} was clicked!`);
	}
}
