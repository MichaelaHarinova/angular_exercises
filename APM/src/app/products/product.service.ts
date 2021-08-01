import { Injectable } from "@angular/core";
import { IProduct } from "./product";
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, tap, map } from "rxjs/operators";
import { productImpl } from "./productImpl";
import * as _ from 'lodash';

@Injectable({
	providedIn: "root"
})
export class ProductService {
	private productUrl = 'http://localhost:9001/products';
  	private productUrlEdit = 'http://localhost:9001/editProduct';

	constructor(private http: HttpClient) {}

	getProduct(id: number): Observable<IProduct | undefined> {
		return this.getProducts().pipe(
			map((products: IProduct[]) => {
				return products.find((p) => p.productId === id)
			}))
		}

    getProducts(): Observable<IProduct[]> {
        return this.http.get<IProduct[]>(this.productUrl)
            .pipe(
				tap((data) => console.log((data))),
			catchError(this.handleError)
		    );   
        }

	submitProduct(product: IProduct, editProduct: productImpl): Observable<any> {
		editProduct.productId = product.productId;
		return this.http.post(this.productUrlEdit, editProduct);
	}

/*	getFilteredProduct(searchTerms: object): Observable<any> {
		console.log("fetching data")
		return this.http.post(this.productUrl, searchTerms);
	}  */

	findProducts(filter: {[index: string]: any} = {}):  Observable<IProduct[]> {
		console.log("productService.findProducts()")
		let httpParams = new HttpParams();
		Object.keys(filter).forEach(key =>{
			httpParams.set(key,filter[key])
		})

        return this.http.get<IProduct[]>(this.productUrl, {
            params: httpParams
        }).pipe(
            map(res =>  res)
        );
		
    }


	private handleError(err: HttpErrorResponse) {
		let errorMessage = "";
		if (err.error instanceof ErrorEvent) {
			errorMessage = `An error occured: ${err.error.message}`;
		} else {
			errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
		}
		console.error(errorMessage);
		return throwError(errorMessage);
	}
}	