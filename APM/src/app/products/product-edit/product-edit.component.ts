import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { IProduct } from "../product";
import { ProductService } from "../product-services/product.service";
import { productImpl } from "../productImpl";

@Component({
  selector: 'pm-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent {
  editedProduct = new productImpl();
  product!: IProduct
  pageTitle = "Edit Product";
  errorMessage = "";
  

  constructor(
		private route: ActivatedRoute,
		private router: Router,
		private productService: ProductService
	)  { 
    const id = Number(this.route.snapshot.paramMap.get("id"));
    if(id){
      this.getProductToEdit(id)
    }else{
      this.getProductToEdit(2)
    }
  }

  getProductToEdit(id: number): void {
      this.productService.getProduct(id).subscribe({
        next: (product) => (product ? (this.product = product) : null),
        error: (err) => (this.errorMessage = err)

      });
    }
  
  
  onBack(): void {
      this.router.navigate(["/products"]).then((r) => console.log());
    }
	
  onSubmit(newPrice: number): void {
      this.editedProduct = this.product;
      this.router.navigate(["/products/" + this.product.productId]).then((r) => console.log());
    }

    public async submitProduct(product: IProduct): Promise<any> {
      this.productService.submitProduct(product, this.product).subscribe
      (response => console.log());
    }
 
    async getRequest(): Promise<any> {
      // custom getter
      await fetch('http://localhost:9001/editProduct', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json()).then(data => this.product = data);
    }
}

