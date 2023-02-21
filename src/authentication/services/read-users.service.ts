import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { OperationsService, RequestStructure, ResponseStructure } from 'src/shared';

import { Users } from '../entities';


@Injectable()
export class ReadUsers {

  constructor(
    @InjectRepository(Users)
    private readonly repository: Repository<Users>,
    private readonly operationsService: OperationsService,
  ) {
    this.operationsService.registerOperation('get_users', this.getUsers());
  }


  private getUsers(): (data: RequestStructure) => Promise<ResponseStructure> {
    return () => {
      return new Promise((resolve) => {
        this.repository.find().then((data: Array<Users>) => {
          const dataToReturn = new ResponseStructure('success', data);
          resolve(dataToReturn);
        }).catch((err) => {
          console.log(err);
          const errorResponse = new ResponseStructure('alert-popup', {message: `Operation "get_users" failed!`});
          resolve(errorResponse);
        });

        return resolve;
      });
    }
  }

}
