import { Component, Input } from "@angular/core";

@Component({
	templateUrl: "./tooltip.component.html",
	styleUrls: ["./tooltip.component.css"]
})
export class TooltipComponent {
	@Input("matTooltip")
	message!: string;
}
