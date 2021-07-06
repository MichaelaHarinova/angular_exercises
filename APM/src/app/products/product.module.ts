import { NgModule } from "@angular/core";
import { ProductListComponent } from "../products/product-list/product-list.component";
import { ProductDetailComponent } from "../products/product-detail/product-detail.component";
import { SharedModule } from "../shared/shared.module";
import { TooltipComponent } from "../shared/components";
import { MatTooltipModule } from "@angular/material/tooltip";
import { CommonModule } from "@angular/common";
import { ProductRoutingModule } from "./product-routing.module";

//import {SnackBarComponent} from '../shared/snack-bar.component';

@NgModule({
	declarations: [
		ProductListComponent,
		ProductDetailComponent,
		TooltipComponent
		//SnackBarComponent
	],
	imports: [
		ProductRoutingModule,
		CommonModule,
		MatTooltipModule,
		SharedModule
	]
})
export class ProductModule {}
