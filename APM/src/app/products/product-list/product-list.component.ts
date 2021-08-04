import { Component, OnInit } from "@angular/core";
import { IProduct } from "../product";
import { ProductService } from "../product.service";
import { Subscription } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ProductsDataSource } from "../products-dataSource";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
	templateUrl: "./product-list.component.html",
	styleUrls: ["./product-list.component.css"]
})
export class ProductListComponent implements OnInit {
	pageTitle = "Product List";

	durationInSeconds = 3;
	imageWidth = 50;
	imageMargin = 2;
	showImage = true;
	buttonActive = true;
	errorMessage = "";

	dataSource: any = ProductsDataSource;
	filterValues: any = {};
	products: IProduct[] = [];
	filterSelectObj: any = [];
	displayedColumns: string[] = [
		"imageUrl",
		"productName",
		"productCode",
		"releaseDate",
		"price",
		"starRating"
	];

	constructor(
		private productService: ProductService,
		private _snackBar: MatSnackBar,
		private route: ActivatedRoute,
		private router: Router
	) {
		this.filterSelectObj = [
			{
				name: "Product Name",
				columnProp: "productName",
				options: []
			},
			{
				name: "Product Code",
				columnProp: "productCode",
				options: []
			},
			{
				name: "Release Date",
				columnProp: "releaseDate",
				options: []
			},
			{
				name: "Price",
				columnProp: "price",
				options: []
			},
			{
				name: "Star Rating",
				columnProp: "starRating",
				options: []
			}
		];
	}

	ngOnInit(): void {
		// this.dataSource.filterPredicate = this.createFilter();
		this.dataSource = new ProductsDataSource(this.productService);
		this.route.queryParams.subscribe((params) => {
			this.dataSource.loadProducts(params, (products: IProduct[]) => {
				this.populateFilterValues(products);
			});
		});
	}

	onRatingClicked(message: string): void {
		this.pageTitle = "Product List: " + message;
	}

	onTitleClickedChange(): void {
		this.buttonActive = !this.buttonActive;
	}

	onButtonClick(): void {
		this.pageTitle = "Click here!";
	}

	onRowClicked(row: any): void {
		console.log("Row clicked: ", row);
	}

	openSnackBar(message: string, action: string): void {
		this._snackBar.open(message, action, {
			duration: this.durationInSeconds * 1000
		});
	}

	// Called on Filter change
	filterChange(filter: any, event: any): void {
		if (filter.modelValue === "" && this.filterValues[filter.columnProp]) {
			delete this.filterValues[filter.columnProp];
		} else {
			this.filterValues[filter.columnProp] = event.target.value;
		}
		this.router.navigate(["/products"], {
			queryParams: this.filterValues
		});
	}

	// Reset table filters
	resetFilters(): void {
		this.filterValues = {};
		this.filterSelectObj.forEach((value: { [index: string]: any }) => {
			value.modelValue = undefined;
		});
		this.router.navigate(["/products"], {
			queryParams: {}
		});
	}

	// handles duplicate filter values
	getFilterObject(fullObj: any, key: any): any {
		const uniqChk: any[] = [];
		fullObj.filter((obj: any) => {
			if (!uniqChk.includes(obj[key])) {
				uniqChk.push(obj[key]);
			}
			return obj;
		});
		return uniqChk;
	}

	populateFilterValues(products: IProduct[]): void {
		this.filterSelectObj.filter((o: any) => {
			o.options = this.getFilterObject(products, o.columnProp);
		});
	}
}
