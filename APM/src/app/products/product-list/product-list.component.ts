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

	dataSource: any=  ProductsDataSource;
	filterValues: any = {};
    displayedColumns: string[] = [ 'imageUrl','productName', 'productCode', 'releaseDate', 'price', 'starRating'];

	products: IProduct[] = [];
	filteredProducts: IProduct[] = [];
	filterSelectObj: any = [];

	constructor(
		private productService: ProductService,
		private _snackBar: MatSnackBar
	) {
		this.filterSelectObj = [
			
			{
			  name: 'Product Name',
			  columnProp: 'productName',
			  options: []
			}, {
			  name: 'Product Code',
			  columnProp: 'productCode',
			  options: []
			}, {
			  name: 'Release Date',
			  columnProp: 'releaseDate',
			  options: []
			}, {
			  name: 'Price',
			  columnProp: 'price',
			  options: []
			},
			{
			  name: 'Star Rating',
			  columnProp: 'starRating',
			  options: []
			}
		]
	}
	

	ngOnInit(): void {

	 
	 //  this.dataSource.filterPredicate = this.createFilter();
	
			this.dataSource = new ProductsDataSource(this.productService);
			this.products = this.dataSource.loadProducts();

				this.populateFilterValues();
		
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

		this.filterValues[filter.columnProp] = event.target.value.trim().toLowerCase()
		this.dataSource.filter = JSON.stringify(this.filterValues)
	}
  


    // Custom filter method fot Angular Material Datatable
 /*   createFilter() {
        let filterFunction = function (data: any, filter: string): boolean {
            let searchTerms = JSON.parse(filter);
            let isFilterSet = false;
	  
            for (const col in searchTerms) {
               if (searchTerms[col].toString() !== '') {
                isFilterSet = true;
               } else {
                delete searchTerms[col];
               }
            }

            let nameSearch = () => {
	    	    let matches: boolean []= [];
                if (isFilterSet) {
                    for (const col in searchTerms) {
			            matches.push(false);
                        searchTerms[col].trim().toLowerCase().split(' ').forEach((word: any, index: number) => {
                            if (data[col].toString().toLowerCase().indexOf(word) != -1 && isFilterSet) { 
                             matches[matches.length -1] = true
                            }
                        });
                    }
		            let numberOfNoMatches = matches.filter(e => e === false);
		        	if(numberOfNoMatches.length > 0){
			         return false
		            } else {
			         return true
		            }
                } else {
                 return true;
                }
            } 
          return nameSearch()
        }
      return filterFunction
    }
*/

    // Reset table filters
    resetFilters() {

        this.filterValues = {}
        this.filterSelectObj.forEach((value: any) => {
          value.modelValue = undefined;
        })
    //    this.dataSource.filter = "";  
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


    populateFilterValues() {
		console.log(this.products)
		this.sub = this.productService.findProducts().subscribe({
		  next: (products) => {
		
			    this.filterSelectObj.filter((o: any) => {
				 o.options = this.getFilterObject(products, o.columnProp);
			    });
		    },
		  error: (err) => (this.errorMessage = err)
		});
	  
	}
  
	
}


