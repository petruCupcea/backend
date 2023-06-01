import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository } from 'typeorm';

import { OperationsService, RequestStructure, ResponseStructure } from '../../shared';

import { ProductImages } from '../entities';


@Injectable()
export class CreateProducts {

  constructor(
    @InjectRepository(ProductImages)
    private readonly repository: Repository<ProductImages>,
    private readonly operationsService: OperationsService,
  ) {
    this.operationsService.registerOperation('create_product_images', this.createProductImages());
  }


  private createProductImages(): (data: RequestStructure) => Promise<ResponseStructure> {
    return (dataReceived: RequestStructure) => {
      return new Promise((resolve) => {
        const newProductImages: Array<any> = [];
        dataReceived.payload.imageNames.map((image) => {
          newProductImages.push(this.repository.create(image));
        });
        this.repository.insert(newProductImages).then((data: InsertResult) => {
          const dataToReturn = new ResponseStructure('success', {id: data?.identifiers[0]});
          console.log(dataToReturn);
          resolve(dataToReturn);
        }).catch((err) => {
          console.log(err);
          const errorResponse = new ResponseStructure('alert-popup', {message: `Operation "update_product" failed!`});
          resolve(errorResponse);
        });

        return resolve;
      });
    }
  }


}
