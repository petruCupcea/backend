import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { OperationsService, RequestStructure, ResponseStructure } from '../../shared';

import { ProductImages } from '../entities';


@Injectable()
export class ReadProductsImages {

  constructor(
    @InjectRepository(ProductImages)
    private readonly repository: Repository<ProductImages>,
    private readonly operationsService: OperationsService,
  ) {
    this.operationsService.registerOperation('get_product_images', this.getProductImages());
    this.operationsService.registerOperation('get_single_image', this.getSingleImage());
  }


  private getProductImages(): (data: RequestStructure) => Promise<ResponseStructure> {
    return (dataReceived) => {
      return new Promise((resolve) => {
        this.repository.find({where: {productId: dataReceived.payload.id}}).then((data: Array<ProductImages>) => {
          const dataToReturn = new ResponseStructure('success', data);
          resolve(dataToReturn);
        }).catch((err) => {
          console.log(err);
          const errorResponse = new ResponseStructure('alert-popup', {message: `Operation "get_product_images" failed!`});
          resolve(errorResponse);
        });

        return resolve;
      });
    }
  }


  private getSingleImage(): (data: RequestStructure) => Promise<ResponseStructure> {
    return (dataReceived) => {
      return new Promise((resolve) => {
        this.repository.find({
          where: {productId: dataReceived.payload.id},
          take: 1
        }).then((data: Array<ProductImages>) => {
          const dataToReturn = new ResponseStructure('success', data[0]);
          resolve(dataToReturn);
        }).catch((err) => {
          console.log(err);
          const errorResponse = new ResponseStructure('alert-popup', {message: `Operation "get_single_image" failed!`});
          resolve(errorResponse);
        });

        return resolve;
      });
    }
  }


}
