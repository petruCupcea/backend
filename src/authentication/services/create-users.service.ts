import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { OperationsService, RequestStructure, ResponseStructure } from 'src/shared';

import { Users } from '../entities';


@Injectable()
export class CreateUsers {

  constructor(
    @InjectRepository(Users)
    private readonly repository: Repository<Users>,
    private readonly operationsService: OperationsService,
  ) {
    this.operationsService.registerOperation('create_user', this.createUser());
  }


  private createUser(): (data: RequestStructure) => Promise<ResponseStructure> {
    return (dataReceived: RequestStructure) => {
      return new Promise((resolve) => {
        const newUser = this.repository.create(this.returnValidUser(dataReceived.payload));
        this.repository.insert(newUser).then(() => {
          const dataToReturn = new ResponseStructure('success');
          resolve(dataToReturn);
        }).catch((err) => {
          console.log(err);
          const errorResponse = new ResponseStructure('alert-popup', {message: `Operation "create_users" failed!`});
          resolve(errorResponse);
        });
        // this.checkUsers();

        return resolve;
      });
    }
  }


  private returnValidUser(user: any): any {
    if (user.password === user.repeatPassword) {
      return {
        name: user.name,
        surname: user.surname,
        email: user.email,
        phoneNumber: user.phoneNumber,
        password: user.password,
      }
    }
  }


  private checkUsers() {
    this.repository.find().then((data) => {
      console.log(data);
    })
  }

}
