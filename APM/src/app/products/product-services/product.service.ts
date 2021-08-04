import { Injectable } from "@angular/core";
import { IProduct } from "../product";
import {
	HttpClient,
	HttpErrorResponse,
	HttpParams
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, tap, map } from "rxjs/operators";
import { productImpl } from "../productImpl";
import * as _ from "lodash";

@Injectable({
	providedIn: "root"
})
export class ProductService {
	private productUrl = "http://localhost:9001";

	constructor(private http: HttpClient) {}

	getProducts(): Observable<IProduct[]> {
		return this.http.get<IProduct[]>(this.productUrl + "/products").pipe(
			tap((data) => console.log(data)),
			// eslint-disable-next-line @typescript-eslint/unbound-method
			catchError(this.handleError)
		);
	}

	findProducts(
		filter: { [index: string]: string } = {}
	): Observable<IProduct[]> {
		const httpParams: HttpParams = new HttpParams().appendAll(filter);

		return this.http
			.get<IProduct[]>(this.productUrl + "/products", {
				params: httpParams
			})
			.pipe(map((res) => res));
	}

	getProduct(id: number): Observable<IProduct | undefined> {
		return this.getProducts().pipe(
			map((products: IProduct[]) => {
				return products.find((p) => p.productId === id);
			})
		);
	}

	submitProduct(
		product: IProduct,
		editProduct: productImpl
	): Observable<any> {
		editProduct.productId = product.productId;
		return this.http.post(this.productUrl + "/editProduct", editProduct);
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
