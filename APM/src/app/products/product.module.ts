import {NgModule} from '@angular/core';
import {ProductListComponent} from "./product-list.component";
import {ProductDetailComponent} from "./product-detail.component";
import {ConvertToSpacesPipe} from "../shared/convert-to-spaces.pipe";
import {RouterModule} from "@angular/router";
import {ProductDetailGuard} from "./product-detail.guard";
import {SharedModule} from '../shared/shared.module';
import {TooltipComponent} from '../shared/tooltip.component';

//import {SnackBarComponent} from '../shared/snack-bar.component';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ConvertToSpacesPipe,
    TooltipComponent,
    //SnackBarComponent
  ],
  imports: [
    RouterModule.forChild([{path: 'products', component: ProductListComponent},
      {
        path: '../products/:id',
        canActivate: [ProductDetailGuard],
        component: ProductDetailComponent
      }
    ]),
    SharedModule
  ]
})
export class ProductModule {
}
