import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SharedModule } from '../shared';

import { ReadCarBrands, ReadProducts, ReadProductsImages } from './services';
import { CarBrand, ProductImages, Products } from './entities';


@Module({
  imports: [
    TypeOrmModule.forFeature([Products, ProductImages, CarBrand]),
    SharedModule,
  ],
  providers: [
    ReadCarBrands,
    ReadProducts,
    ReadProductsImages,
  ],
})
export class ProductsModule {
}
