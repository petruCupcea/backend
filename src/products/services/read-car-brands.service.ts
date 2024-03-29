import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { OperationsService, RequestStructure, ResponseStructure } from '../../shared';

import { FilterNames } from '../entities';


@Injectable()
export class ReadCarBrands {

  constructor(
    @InjectRepository(FilterNames)
    private readonly repository: Repository<FilterNames>,
    private readonly operationsService: OperationsService,
  ) {
    this.operationsService.registerOperation('get_car_brands', this.getCarBrands());
  }


  private getCarBrands(): (data: RequestStructure) => Promise<ResponseStructure> {
    return () => {
      return new Promise((resolve) => {
        this.repository.find().then((data: Array<FilterNames>) => {
          const dataToReturn = new ResponseStructure('success', data);
          resolve(dataToReturn);
        }).catch((err) => {
          console.log(err);
          const errorResponse = new ResponseStructure('alert-popup', {message: `Operation "get_car_brands" failed!`});
          resolve(errorResponse);
        });

        return resolve;
      });
    }
  }

}
