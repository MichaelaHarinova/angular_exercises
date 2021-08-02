import {
	Component,
	OnDestroy,
	OnInit
} from "@angular/core";
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
export class ProductListComponent implements OnInit, OnDestroy {
	
	pageTitle = "Product List";

	durationInSeconds = 3;
	imageWidth = 50;
	imageMargin = 2;
	showImage = true;
	buttonActive = true;
	errorMessage = "";
	
	sub!: Subscription;

	dataSource: any = ProductsDataSource;
	filterValues: any = {};
    displayedColumns: string[] = [
		'imageUrl',
		'productName',
		'productCode',
		'releaseDate',
		'price',
		'starRating'
	];

	products: IProduct[] = [];
	filteredProducts: IProduct[] = [];
	filterSelectObj: any = [];


	constructor(
		private productService: ProductService,
		private _snackBar: MatSnackBar,
		private route: ActivatedRoute,
		private router: Router
	) {
		this.filterSelectObj = [
			
			{
			  name: 'Product Name',
			  columnProp: 'productName',
			  options: [],
			  noneSelected: true
			}, {
			  name: 'Product Code',
			  columnProp: 'productCode',
			  options: [],
			  noneSelected: true
			}, {
			  name: 'Release Date',
			  columnProp: 'releaseDate',
			  options: [],
			  noneSelected: true
			}, {
			  name: 'Price',
			  columnProp: 'price',
			  options: [],
			  noneSelected: true
			},
			{
			  name: 'Star Rating',
			  columnProp: 'starRating',
			  options: [],
			  noneSelected: true
			}
		]
	}
	

	ngOnInit(): void {
	 // this.dataSource.filterPredicate = this.createFilter();
		this.dataSource = new ProductsDataSource(this.productService);
		this.route.queryParams.subscribe(params => {
			let decodedParams: {[index: string]: any} = {};
			Object.keys(params).forEach((key: string) => {
				decodedParams[key] = decodeURI(params[key]);

			});
			this.dataSource.loadProducts(decodedParams,(products: IProduct[]) => {this.populateFilterValues(products)});
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

	onRowClicked(row: any) {
		console.log('Row clicked: ', row);
	}
	
	openSnackBar(message: string, action: string) {
		this._snackBar.open(message, action, {
			duration: this.durationInSeconds * 1000
		});
	}


    // Called on Filter change
    filterChange(filter: any, event: any) {
	//	console.log('productListComponent.filterChange()');
	if(filter.modelValue === "" && this.filterValues[filter.columnProp]){
		console.log('empty');
		delete this.filterValues[filter.columnProp];
	} else {
		this.filterValues[filter.columnProp] = event.target.value;

	}
		this.router.navigate(['/products'], {
			queryParams: this.filterValues
		});	
	}	
		
  

    // Reset table filters
    resetFilters() {

		this.dataSource.loadProducts({},(products: IProduct[]) => {
			this.populateFilterValues(products);
		});
    }


    getFilterObject(fullObj: any, key: any) {

	    const uniqChk: any[] = [];
	    fullObj.filter((obj: any) => {
	      if (!uniqChk.includes(obj[key])) {
		    uniqChk.push(obj[key]);
	    }
	  return obj;
	  });
	  return uniqChk;
    }


    populateFilterValues(products: IProduct[]) {
		//console.log(this.products)
		this.filterSelectObj.filter((o: any) => {
			o.options = this.getFilterObject(products, o.columnProp);
		   });
	  
	}
  
	
}


