import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';

import { OperationsService, RequestStructure, ResponseStructure } from 'src/shared';

import { Users } from '../entities';


@Injectable()
export class ReadUsers {

  constructor(
    @InjectRepository(Users)
    private readonly repository: Repository<Users>,
    private readonly operationsService: OperationsService,
  ) {
    this.operationsService.registerOperation('login_user', this.getLoginUser());
  }


  private getLoginUser(): (data: RequestStructure) => Promise<ResponseStructure> {
    return (receivedData: RequestStructure) => {
      return new Promise((resolve) => {
        const findOptions = {
          where: {
            email: receivedData.payload.email,
          },
        }
        this.repository.find(findOptions).then((data: Array<Users>) => {
          let dataToReturn;
          if (data && data.length === 1 && (data[0].password === this.hashPassword(receivedData.payload.password))) {
            dataToReturn = new ResponseStructure('success', {
              message: 'Login Success',
            });
          } else {
            dataToReturn = new ResponseStructure('error', {
              message: 'Email-ul sau parola sunt incorecte.',
            });
          }
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


  private hashPassword(value: string) {
    try {
      return (crypto.createHash('sha256').update(value).digest('hex'));
    } catch (e) {
      console.log(e);
    }
  }

}
