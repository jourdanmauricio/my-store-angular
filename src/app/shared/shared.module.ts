import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SwiperModule } from 'swiper/angular';

import { ImgComponent } from './components/img/img.component';
import { ProductComponent } from './components/product/product.component';
import { ProductsComponent } from './components/products/products.component';

@NgModule({
  declarations: [ImgComponent, ProductComponent, ProductsComponent],
  imports: [CommonModule, RouterModule, SwiperModule],
  exports: [ImgComponent, ProductComponent, ProductsComponent],
})
export class SharedModule {}
