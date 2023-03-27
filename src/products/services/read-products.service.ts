import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { OperationsService, RequestStructure, ResponseStructure } from '../../shared';

import { Products } from '../entities';


@Injectable()
export class ReadProducts {

  constructor(
    @InjectRepository(Products)
    private readonly repository: Repository<Products>,
    private readonly operationsService: OperationsService,
  ) {
    this.operationsService.registerOperation('get_products', this.getProducts());
  }


  private getProducts(): (data: RequestStructure) => Promise<ResponseStructure> {
    return () => {
      return new Promise((resolve) => {
        this.repository.find().then((data: Array<Products>) => {
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
