import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SharedModule } from '../shared';

import {
  CreateProducts,
  CreateUserProducts,
  DeleteProductService,
  DeleteUserProducts,
  ReadCarBrands,
  ReadProducts,
  ReadProductsImages,
  ReadUserProducts
} from './services';
import { FilterNames, ProductImages, Products, UserProductEntity } from './entities';


@Module({
  imports: [
    TypeOrmModule.forFeature([Products, ProductImages, FilterNames, UserProductEntity]),
    SharedModule,
  ],
  providers: [
    CreateProducts,
    CreateUserProducts,
    ReadCarBrands,
    ReadProducts,
    ReadUserProducts,
    ReadProductsImages,
    DeleteProductService,
    DeleteUserProducts,
  ],
})
export class ProductsModule {
}
