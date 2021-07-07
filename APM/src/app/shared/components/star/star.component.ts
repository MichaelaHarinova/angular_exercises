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
	@Input() maxDivWidth = 75;
	@Input() starSize = 16;
	@Input() rating = 0;
	@Input() color = "gray";
	@Input() label = "";
	@Output() ratingClicked: EventEmitter<string> = new EventEmitter<string>();

	ngOnChanges(): void {
		this.cropWidth = (this.rating * this.maxDivWidth) / 5;
	}

	onClick(): void {
		this.ratingClicked.emit(`The rating ${this.rating} was clicked!`);
	}
}
