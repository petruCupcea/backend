import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { OperationsService, RequestStructure, ResponseStructure } from '../../shared';

import { UserProductEntity } from '../entities';


@Injectable()
export class DeleteUserProducts {

  constructor(
    @InjectRepository(UserProductEntity)
    private readonly repository: Repository<UserProductEntity>,
    private readonly operationsService: OperationsService,
  ) {
    this.operationsService.registerOperation('delete_user_product', this.deleteUserProduct());
  }


  private deleteUserProduct(): (data: RequestStructure) => Promise<ResponseStructure> {
    return (dataReceived: RequestStructure) => {
      return new Promise((resolve) => {
        this.repository.createQueryBuilder()
          .delete()
          .from(UserProductEntity)
          .where("productId = :id", {id: dataReceived.payload.productId})
          .execute().then(() => {
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
