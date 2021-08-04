import { NgModule } from "@angular/core";
import { SharedModule } from "../../shared/shared.module";
import { CommonModule } from "@angular/common";
import { ProductRoutingModule } from "./product-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { MatTooltipModule } from "@angular/material/tooltip";
import { MatTableModule } from "@angular/material/table";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatPaginatorModule } from "@angular/material/paginator";

import { ProductEditComponent } from "../product-edit/product-edit.component";
import { ProductListComponent } from "../../products/product-list/product-list.component";
import { ProductDetailComponent } from "../../products/product-detail/product-detail.component";

import { TooltipComponent } from "../../shared/components";

@NgModule({
	declarations: [
		ProductListComponent,
		ProductDetailComponent,
		TooltipComponent,
		ProductEditComponent
		//SnackBarComponent
	],
	imports: [
		ProductRoutingModule,
		CommonModule,
		SharedModule,

		MatTooltipModule,
		MatButtonModule,
		MatInputModule,
		MatTableModule,
		MatSelectModule,
		MatPaginatorModule,
		MatProgressSpinnerModule,

		FormsModule,
		ReactiveFormsModule
	]
})
export class ProductModule {}
