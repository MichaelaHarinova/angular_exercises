import {
	Component,
	EventEmitter,
	OnDestroy,
	OnInit,
	Output
} from "@angular/core";
import { IProduct } from "../product";
import { ProductService } from "../product.service";
import { Subscription } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
	templateUrl: "./product-list.component.html",
	styleUrls: ["./product-list.component.css"]
})
export class ProductListComponent implements OnInit, OnDestroy {
	constructor(
		private productService: ProductService,
		private _snackBar: MatSnackBar
	) {}
	durationInSeconds = 3;
	pageTitle = "Product List";
	imageWidth = 50;
	imageMargin = 2;
	showImage = false;
	buttonActive = true;
	errorMessage = "";
	sub!: Subscription;

	private _listFilter = "";
	get listFilter(): string {
		return this._listFilter;
	}

	set listFilter(value: string) {
		this._listFilter = value;
		console.log("in setter ", value);
		this.filteredProducts = this.performFilter(value);
	}

	filteredProducts: IProduct[] = [];

	products: IProduct[] = [];

	performFilter(filterBy: string): IProduct[] {
		filterBy = filterBy.toLocaleLowerCase();
		return this.products.filter((product: IProduct) =>
			product.productName.toLocaleLowerCase().includes(filterBy)
		);
	}

	toggleImage(): void {
		this.showImage = !this.showImage;
	}

	ngOnInit(): void {
		this.sub = this.productService.getProducts().subscribe({
			next: (products) => {
				this.products = products;
				this.filteredProducts = this.products;
			},
			error: (err) => (this.errorMessage = err)
		});
	}

	ngOnDestroy() {
		this.sub.unsubscribe();
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
	openSnackBar(message: string, action: string) {
		this._snackBar.open(message, action, {
			duration: this.durationInSeconds * 1000
		});
	}
}