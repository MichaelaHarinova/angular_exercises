import { IProduct } from "./product";
import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable, of } from "rxjs";
import { ProductService } from "./product.service";
import { catchError, finalize } from "rxjs/operators";


export class ProductsDataSource implements DataSource<IProduct> {
    
    private productsSubject = new BehaviorSubject<IProduct[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    constructor(private productService: ProductService) {}

    connect(collectionViewer: CollectionViewer): Observable<IProduct[]> {
        console.log("Connecting data source");
        return this.productsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.productsSubject.complete();
        this.loadingSubject.complete();
    }
  
    loadProducts(filter: {[index: string]: any} = {}, func:(products: IProduct[])=>void = (products)=>{}): void {
        this.loadingSubject.next(true);
       
        this.productService.findProducts(filter).pipe(
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false))
        )
        .subscribe(products => {
            this.productsSubject.next(products);
            func(products);
        })
    } 
}