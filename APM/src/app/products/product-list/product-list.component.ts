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
	 
	  getRemoteData() {
	  const productsArray = [
			{
			  "productId": 1,
			  "productName": "Leaf Rake",
			  "productCode": "GDN-0011",
			  "releaseDate": "March 19, 2021",
			  "description": "Leaf rake with 48-inch wooden handle.",
			  "price": 19.95,
			  "starRating": 3.2,
			  "imageUrl": "assets/images/leaf_rake.png"
			},
			{
			  "productId": 2,
			  "productName": "Garden Cart",
			  "productCode": "GDN-0023",
			  "releaseDate": "March 18, 2021",
			  "description": "15 gallon capacity rolling garden cart",
			  "price": 32.99,
			  "starRating": 4.2,
			  "imageUrl": "assets/images/garden_cart.png"
			},
			{
			  "productId": 5,
			  "productName": "Hammer",
			  "productCode": "TBX-0048",
			  "releaseDate": "May 21, 2021",
			  "description": "Curved claw steel hammer",
			  "price": 8.9,
			  "starRating": 4.8,
			  "imageUrl": "assets/images/hammer.png"
			},
			{
			  "productId": 8,
			  "productName": "Saw",
			  "productCode": "TBX-0022",
			  "releaseDate": "May 15, 2021",
			  "description": "15-inch steel blade hand saw",
			  "price": 11.55,
			  "starRating": 3.7,
			  "imageUrl": "assets/images/saw.png"
			},
			{
			  "productId": 10,
			  "productName": "Video Game Controller",
			  "productCode": "GMG-0042",
			  "releaseDate": "October 15, 2020",
			  "description": "Standard two-button video game controller",
			  "price": 35.95,
			  "starRating": 4.6,
			  "imageUrl": "assets/images/xbox-controller.png"
			}
	  ];
	  this.dataSource.data = productsArray;

	  this.filterSelectObj.filter((o: any) => {
		o.options = this.getFilterObject(productsArray, o.columnProp);
	  });
	}

	performFilter(filterBy: string): IProduct[] {
		filterBy = filterBy.toLocaleLowerCase();
		return this.products.filter((product: IProduct) =>
			product.productName.toLocaleLowerCase().includes(filterBy)
		);
	}
	
	ngOnInit(): void {
		this.getRemoteData();

		// Overrride default filter behaviour of Material Datatable
		this.dataSource.filterPredicate = this.createFilter();
	  
		this.sub = this.productService.getProducts().subscribe({
			next: (products) => {
				this.products = products;
				this.filteredProducts = this.products;
			},
			error: (err) => (this.errorMessage = err)
		});
		}


		getFilterObject(fullObj: any, key: any) {
			const uniqChk: any[] = [];
			fullObj.filter((obj: any) => {
			  if (!uniqChk.includes(obj[key])) {
				uniqChk.push(obj[key]);
				console.log("test2");
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
        let found = false;
        if (isFilterSet) {
          for (const col in searchTerms) {
            searchTerms[col].trim().toLowerCase().split(' ').forEach((word: any) => {
              if (data[col].toString().toLowerCase().indexOf(word) != -1 && isFilterSet) {
                found = true
              }
            });
          }
          return found
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

