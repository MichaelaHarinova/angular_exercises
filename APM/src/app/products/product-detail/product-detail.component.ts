import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { IProduct } from "../product";
import { ProductService } from "../product.service";


@Component({
	templateUrl: "./product-detail.component.html",
	styleUrls: ["./product-detail.component.css"]
})
export class ProductDetailComponent  {
	pageTitle = "Products Detail";
	product!: IProduct;
	errorMessage = "";
	

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private productService: ProductService
	) {
		const id = Number(this.route.snapshot.paramMap.get("id"));
		console.log(id);
		if (id) {
			this.getProduct(id);
		} else {
			this.getProduct(2);
		}
	}

	getProduct(id: number): void {
		this.productService.getProduct(id).subscribe({
			next: (product) => (product ? (this.product = product) : null),
			error: (err) => (this.errorMessage = err)
		});
	}
	
	onBack(): void {
		this.router.navigate(["/products"]).then((r) => console.log());
	}

    onEdit(): void {	
	
			this.router.navigate(["/updateProduct/" + Number(this.route.snapshot.paramMap.get("id"))]).then((r) => console.log());
	  }
	
	}
