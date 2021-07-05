import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailComponent } from './product-detail.component';
import { ProductDetailGuard } from './product-detail.guard';
import { ProductListComponent } from './product-list.component';

const routes: Routes = [
  {
    path: 'products/:id',
    canActivate: [ProductDetailGuard],
    component: ProductDetailComponent,
  },
  { path: 'products', component: ProductListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
