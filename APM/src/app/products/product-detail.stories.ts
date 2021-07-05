import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { SharedModule } from '../shared/shared.module';
import { ProductDetailComponent } from './product-detail.component';
import { ProductRoutingModule } from './product-routing.module';

export default {
  component: ProductDetailComponent,
  decorators: [
    moduleMetadata({
      declarations: [ProductDetailComponent],
      imports: [
        CommonModule,
        SharedModule,
        HttpClientModule,
        ProductRoutingModule,
        RouterModule.forRoot([]),
      ],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
    }),
  ],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  title: 'Library/Products/ProductDetail',
} as Meta;

const Template: Story<ProductDetailComponent> = (args) => ({
  component: ProductDetailComponent,
  props: {
    ...args,
  },
});

export const detailDefault = Template.bind({});
detailDefault.args = {};
