import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { IProduct } from "../product";
import { ProductService } from "../product.service";
import { ProductDetailComponent } from "..";

@Component({
  selector: 'pm-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent {
  product!: IProduct
  pageTitle = "Edit Product";
  errorMessage = "";


  constructor(
		private route: ActivatedRoute,
		private router: Router,
		private productService: ProductService
	)  { 
    const id = Number(this.route.snapshot.paramMap.get("id"));
    console.log(id);
    if(id){
      this.ngOnInit(id)
    }else{
      this.ngOnInit(2)
    }
  }

  ngOnInit(id: number): void {
      this.productService.getProduct(id).subscribe({
        next: (product) => (product ? (this.product = product) : null),
        error: (err) => (this.errorMessage = err)
      });
    }
  
  
  onBack(): void {
      this.router.navigate(["/products"]).then((r) => console.log());
    }
	
  onSubmit(): void {
      this.productService.upadteProduct(this.product.productId).subscribe
      (this.getRequest('http://localhost:9001/editProduct').then(res => console.log(this.product.productId)), console.error());
    }

  async getRequest(url: string): Promise<any> {
      // custom getter
      await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json()).then(data => this.product = data);
    }
}

