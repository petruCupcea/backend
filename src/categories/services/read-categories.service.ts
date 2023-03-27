import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { OperationsService, RequestStructure, ResponseStructure } from "src/shared";

import { Categories } from "../entities";


@Injectable()
export class ReadCategories {

  constructor(
    @InjectRepository(Categories)
    private readonly repository: Repository<Categories>,
    private readonly operationsService: OperationsService,
  ) {
    this.operationsService.registerOperation('get_groups', this.getGroups());
    this.operationsService.registerOperation('get_categories', this.getCategories());
    this.operationsService.registerOperation('get_subcategories', this.getSubCategories());
  }


  private getGroups(): (data: RequestStructure) => Promise<ResponseStructure> {
    return () => {
      return new Promise((resolve) => {
        this.repository.find({where: {type: 'group'}}).then((data: Array<Categories>) => {
          // console.log(data);
          const dataToReturn = new ResponseStructure('success', data);
          resolve(dataToReturn);
        }).catch((err) => {
          console.log(err);
          const errorResponse = new ResponseStructure('alert-popup', {message: `Operation "get_groups" failed!`});
          resolve(errorResponse);
        });

        return resolve;
      });
    }
  }


  private getCategories(): (data: RequestStructure) => Promise<ResponseStructure> {
    return (dataReceived) => {
      return new Promise((resolve) => {
        this.repository.find({where: {groupId: dataReceived.payload.groupId}}).then((data: Array<Categories>) => {
          const dataToReturn = new ResponseStructure('success', data);
          resolve(dataToReturn);
        }).catch((err) => {
          console.log(err);
          const errorResponse = new ResponseStructure('alert-popup', {message: `Operation "get_categories" failed!`});
          resolve(errorResponse);
        });

        return resolve;
      });
    }
  }


  private getSubCategories(): (data: RequestStructure) => Promise<ResponseStructure> {
    return (dataReceived) => {
      return new Promise((resolve) => {
        this.repository.find({where: {groupId: dataReceived.payload.categoryId}}).then((data: Array<Categories>) => {
          // console.log(data);
          const dataToReturn = new ResponseStructure('success', data);
          resolve(dataToReturn);
        }).catch((err) => {
          console.log(err);
          const errorResponse = new ResponseStructure('alert-popup', {message: `Operation "get_subcategories" failed!`});
          resolve(errorResponse);
        });

        return resolve;
      });
    }
  }

}
