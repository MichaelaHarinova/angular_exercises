import {
	Component,
	OnDestroy,
	OnInit
} from "@angular/core";
import { IProduct } from "../product";
import { ProductService } from "../product.service";
import { Subscription } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTableDataSource } from '@angular/material/table';
import { forEach } from "lodash";



@Component({
	templateUrl: "./product-list.component.html",
	styleUrls: ["./product-list.component.css"]
})
export class ProductListComponent implements OnInit, OnDestroy {
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
	
	filterValues: any = {};
	dataSource = new MatTableDataSource();
    displayedColumns: string[] = [ 'imageUrl','productName', 'productCode', 'releaseDate', 'price', 'starRating'];

	filterSelectObj: any = [];
	
	durationInSeconds = 3;
	pageTitle = "Product List";
	imageWidth = 50;
	imageMargin = 2;
	showImage = true;
	buttonActive = true;
	errorMessage = "";
	sub!: Subscription;


      products: IProduct[] = [];
	  filteredProducts: IProduct[] = [];

	  ngOnInit(): void {
		this.getRemoteData();
console.log("init")
		// Overrride default filter behaviour of Material Datatable
		this.dataSource.filterPredicate = this.createFilter();
		
		}
	 
	  getRemoteData() {
	 let productsArray: any;
	  this.sub = this.productService.getProducts().subscribe({
		next: (products) => {
			productsArray = products;
			this.filteredProducts = this.products;
			this.dataSource.data = productsArray;

			this.filterSelectObj.filter((o: any) => {
			  o.options = this.getFilterObject(productsArray, o.columnProp);
			});
		},
		error: (err) => (this.errorMessage = err)
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


  // Called on Filter change
  filterChange(filter: any, event: any){

		//let filterValues = {}
		this.filterValues[filter.columnProp] = event.target.value.trim().toLowerCase()
		this.dataSource.filter = JSON.stringify(this.filterValues)
	  }
  


  // Custom filter method fot Angular Material Datatable
  createFilter() {
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

      console.log(searchTerms);

      let nameSearch = () => {
		  console.log("nameSearch")
        let found = false;
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
		  console.log(matches)
		  if(numberOfNoMatches.length > 0){
			return false
		  }else{
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
  // Reset table filters
  resetFilters() {
    this.filterValues = {}
    this.filterSelectObj.forEach((value: any) => {
      value.modelValue = undefined;
    })
    this.dataSource.filter = "";
  }
}


//search bar
/*	private _listFilter = "";
	get listFilter(): string {
		return this._listFilter;
	}

	set listFilter(value: string) {
		this._listFilter = value;
		console.log("in setter ", value);
		this.filteredProducts = this.performFilter(value);
	}

	performFilter(filterBy: string): IProduct[] {
		filterBy = filterBy.toLocaleLowerCase();
		return this.products.filter((product: IProduct) =>
			product.productName.toLocaleLowerCase().includes(filterBy)
		);
	}
//show/hide image button
	toggleImage(): void {
		this.showImage = !this.showImage;
	}*/

