import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { OperationsService, RequestStructure, ResponseStructure } from '../../shared';

import { Products, UserProductEntity } from '../entities';


@Injectable()
export class CreateUserProducts {

  constructor(
    @InjectRepository(Products)
    private readonly repository: Repository<Products>,
    private readonly operationsService: OperationsService,
  ) {
    this.operationsService.registerOperation('delete_product', this.deleteProduct());
  }


  private deleteProduct(): (data: RequestStructure) => Promise<ResponseStructure> {
    return (dataReceived: RequestStructure) => {
      return new Promise((resolve) => {
        const productToDelete = this.repository.create(dataReceived.payload);
        this.repository.remove(productToDelete).then(() => {
          const dataToReturn = new ResponseStructure('success');
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
