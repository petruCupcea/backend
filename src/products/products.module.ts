import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SharedModule } from '../shared';

import { ReadProducts, ReadProductsImages } from './services';
import { ProductImages, Products } from './entities';


@Module({
  imports: [
    TypeOrmModule.forFeature([Products, ProductImages]),
    SharedModule,
  ],
  providers: [
    ReadProducts,
    ReadProductsImages,
  ],
})
export class ProductsModule {
}
