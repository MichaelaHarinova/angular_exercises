import { Component, OnInit } from "@angular/core";
import { ChartDataSets, ChartOptions, ChartType } from "chart.js";
import { Label } from "ng2-charts";
import { ProductService } from "src/app/products/product-services/product.service";
import { IProduct } from "../../../../products/product";

@Component({
	selector: "pm-bar-chart",
	templateUrl: "./bar-chart.component.html",
	styleUrls: ["./bar-chart.component.css"]
})
export class BarChartComponent implements OnInit {
	constructor(private productService: ProductService) {}

	product_names: string[] = [];
	product_prices: { x: number; y: number }[] = [];

	public barChartLabels: Label[] = [];
	public barChartType: ChartType = "bar";
	public barChartLegend = true;

	ngOnInit(): void {
		this.productService.getProducts().subscribe((res: IProduct[]) => {
			this.product_names = res.map((value) => value.productName);
			this.product_prices = res.map((value, index) => {
				return { x: index * 2, y: value.price };
			});
			this.barChartData[0].data = this.product_prices;
			this.barChartLabels = this.product_names;
		});
	}

	public barChartOptions: ChartOptions = {
		responsive: true,
		scales: { xAxes: [{}], yAxes: [{}] },
		plugins: {
			datalabels: {
				anchor: "end",
				align: "end"
			}
		}
	};

	public barChartData: ChartDataSets[] = [
		{
			barThickness: 50,
			maxBarThickness: 80,
			label: "Product price",
			data: [],
			hoverBackgroundColor: [
				"rgb(144, 255, 144)",
				"rgb(32, 123, 235)",
				"rgb(90, 202, 172)",
				"rgb(71, 165, 74)",
				"rgb(54, 162, 235)",
				"rgb(98, 188, 233)",
				"rgb(75, 192, 192)",
				"rgb(98, 152, 233)",
				"rgb(16, 207, 245)"
			],
			hoverBorderColor: "none",
			backgroundColor: [
				"rgba(144, 255, 144, 0.2)",
				"rgba(32, 123, 235, 0.2)",
				"rgba(90, 202, 172, 0.2)",
				"rgba(71, 165, 74, 0.2)",
				"rgba(54, 162, 235, 0.2)",
				"rgba(98, 188, 233, 0.2)",
				"rgba(75, 192, 192, 0.2)",
				"rgba(98, 152, 233, 0.2)",
				"rgba(16, 207, 245, 0.2)"
			],
			borderColor: [
				"rgb(144, 255, 144)",
				"rgb(32, 123, 235)",
				"rgb(90, 202, 172)",
				"rgb(71, 165, 74)",
				"rgb(54, 162, 235)",
				"rgb(98, 188, 233)",
				"rgb(75, 192, 192)",
				"rgb(98, 152, 233)",
				"rgb(16, 207, 245)"
			],
			borderWidth: 1
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
