import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { OperationsService, RequestStructure, ResponseStructure } from '../../shared';

import { UserProductEntity } from '../entities';


@Injectable()
export class CreateUserProducts {

  constructor(
    @InjectRepository(UserProductEntity)
    private readonly repository: Repository<UserProductEntity>,
    private readonly operationsService: OperationsService,
  ) {
    this.operationsService.registerOperation('create_user_product', this.createProduct());
  }


  private createProduct(): (data: RequestStructure) => Promise<ResponseStructure> {
    return (dataReceived: RequestStructure) => {
      return new Promise((resolve) => {
        const newUserProduct = this.repository.create(dataReceived.payload);
        this.repository.insert(newUserProduct).then(() => {
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
