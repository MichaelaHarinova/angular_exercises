import { Injectable } from "@angular/core";
import { IProduct } from "./product";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, tap, map } from "rxjs/operators";


@Injectable({
	providedIn: "root"
})
export class ProductService {
	[x: string]: any;
	private productUrl = 'http://localhost:9001/products';
  	private productUrlEdit = 'http://localhost:9001/upadteProduct';

	constructor(private http: HttpClient) {}

	getProducts(): Observable<IProduct[]> {
		return this.http.get<IProduct[]>(this.productUrl).pipe(
			tap((data) => console.log("All:", JSON.stringify(data))),
			catchError(this.handleError)
		);
	}

	getProduct(id: number): Observable<IProduct | undefined> {
		console.log("get product")
		return this.getProducts().pipe(
			map((products: IProduct[]) => {
			//	this.setProduct(1,"TEST");
				return products.find((p) => p.productId === id)}	
			)
		);
	}

	setProduct(id: number,s: string): void {

		this.getProducts().pipe(
			map((products: IProduct[]) => 
				{
					
					
					let productToUpdate = products.find((p) => p.productId === id)
					productToUpdate!.productName = s;
					console.log(productToUpdate);
					
				}
			)
		);
	} 

/*	updateFriend(product: IProduct, updatedProduct: IProduct): Observable<any> {
		updatedProduct.productId = product.productId;
		return this.http.post(this.productUrlEdit, updatedProduct);
	  }*/

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
