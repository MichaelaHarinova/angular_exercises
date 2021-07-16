import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { ProductDetailGuard } from "./product-detail/product-detail.guard";
import { ProductListComponent } from "./product-list/product-list.component";
import { ProductEditComponent } from "./product-edit/product-edit.component";

const routes: Routes = [
	{
		path: "products/:id",
		canActivate: [ProductDetailGuard],
		component: ProductDetailComponent
	},
	{ path: "products", component: ProductListComponent },
	{ path: "updateProduct/:id", component: ProductEditComponent}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ProductRoutingModule {}
