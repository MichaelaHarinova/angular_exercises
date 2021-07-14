import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { IProduct } from "../product";
import { ProductService } from "../product.service";

@Component({
  selector: 'pm-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent {
  product!: IProduct
  pageTitle = "Edit Product";

  constructor(
		private route: ActivatedRoute,
		private router: Router,
		private productService: ProductService
	)  { 
    const id = Number(this.route.snapshot.paramMap.get("id"));
  }

  ngOnInit(): void {
  }


	public async onEdit(product: IProduct): Promise<any>{
		this.productService.onEdit(product, this.product).subscribe
	  }
	

}

