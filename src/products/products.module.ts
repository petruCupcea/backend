import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SharedModule } from '../shared';

import { ReadCarBrands, ReadProducts, ReadProductsImages, ReadUserProducts } from './services';
import { FilterNames, ProductImages, Products, UserProductEntity } from './entities';
import { CreateUserProducts } from './services/create-user-products.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([Products, ProductImages, FilterNames, UserProductEntity]),
    SharedModule,
  ],
  providers: [
    ReadCarBrands,
    ReadProducts,
    ReadUserProducts,
    ReadProductsImages,
    CreateUserProducts,
  ],
})
export class ProductsModule {
}
