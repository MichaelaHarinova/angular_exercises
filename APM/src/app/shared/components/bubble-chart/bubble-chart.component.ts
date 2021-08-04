import { Component, OnInit } from "@angular/core";
import { ChartDataSets, ChartOptions, ChartType, Chart } from "chart.js";
import { Color } from "ng2-charts";
import { ProductService } from "src/app/products/product.service";
import { IProduct } from "../../../products/product";

@Component({
	selector: "pm-bubble-chart",
	templateUrl: "./bubble-chart.component.html",
	styleUrls: ["./bubble-chart.component.css"]
})
export class BubbleChartComponent implements OnInit {
	constructor(private productService: ProductService) {}

	chart = [];
	product_names: string[] = [];
	product_prices: { x: number; y: number; r: number }[] = [];

	ngOnInit(): void {
		this.productService.getProducts().subscribe((res: IProduct[]) => {
			this.product_names = res.map((value) => value.productName);
			this.product_prices = res.map((value, index) => {
				return { x: value.price, y: index * 3, r: 15 };
			});
			this.bubbleChartData[0].data = this.product_prices;
		});
	}
	public bubbleChartOptions: ChartOptions = {
		responsive: true,
		scales: {
			xAxes: [
				{
					ticks: {
						min: 0,
						max: 30
					}
				}
			],
			yAxes: [
				{
					ticks: {
						min: 0,
						max: 30
					}
				}
			]
		}
	};
	public bubbleChartType: ChartType = "bubble";
	public bubbleChartLegend = true;

	public bubbleChartData: ChartDataSets[] = [
		{
			label: "Product price",
			backgroundColor: "green",
			borderColor: "blue",
			hoverBackgroundColor: "grey",
			hoverBorderColor: "black"
		}
	];

	public bubbleChartColors: Color[] = [
		{
			backgroundColor: [
				"#6fbb94",
				"green",
				"blue",
				"#67e6e0",
				"yellow",
				"#2288a7",
				"#50b76f",
				"cyan",
				"#34abab",
				"#b3b04c"
			]
		}
	];

	// events
	public chartClicked({
		event,
		active
	}: {
		event: MouseEvent;
		active: {}[];
	}): void {
		console.log(event, active);
	}

	public chartHovered({
		event,
		active
	}: {
		event: MouseEvent;
		active: {}[];
	}): void {
		console.log(event, active);
	}
}
