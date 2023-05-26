import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { OperationsService, RequestStructure, ResponseStructure } from '../../shared';

import { UserProductEntity } from '../entities';


@Injectable()
export class ReadUserProducts {

  constructor(
    @InjectRepository(UserProductEntity)
    private readonly repository: Repository<UserProductEntity>,
    private readonly operationsService: OperationsService,
  ) {
    this.operationsService.registerOperation('get_user_products', this.getProducts());
  }


  private getProducts(): (data: RequestStructure) => Promise<ResponseStructure> {
    return (dataReceived) => {
      return new Promise((resolve) => {
        this.repository.find({where: {userId: dataReceived.payload.userId}}).then((data: Array<UserProductEntity>) => {
          const dataToReturn = new ResponseStructure('success', data);
          resolve(dataToReturn);
        }).catch((err) => {
          console.log(err);
          const errorResponse = new ResponseStructure('alert-popup', {message: `Operation "get_products" failed!`});
          resolve(errorResponse);
        });

        return resolve;
      });
    }
  }


}
