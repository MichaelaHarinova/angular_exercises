import { NgModule } from "@angular/core";
import { ProductListComponent } from "./product-list.component";
import { ProductDetailComponent } from "./product-detail.component";
import { RouterModule } from "@angular/router";
import { ProductDetailGuard } from "./product-detail.guard";
import { SharedModule } from "../shared/shared.module";
import { TooltipComponent } from "../shared/tooltip.component";
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
