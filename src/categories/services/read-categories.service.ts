import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindManyOptions, Repository } from "typeorm";

import { OperationsService, RequestStructure, ResponseStructure } from "src/shared";

import { Categories } from "../entities";


@Injectable()
export class ReadCategories {

  constructor(
    @InjectRepository(Categories)
    private readonly repository: Repository<Categories>,
    private readonly operationsService: OperationsService,
  ) {
    this.operationsService.registerOperation('get_categories', this.getCategories());
  }


  private getCategories(): (data: RequestStructure) => Promise<ResponseStructure> {
    return () => {
      return new Promise((resolve) => {
        const options: FindManyOptions = {order: {index: 'ASC'}};
        this.repository.find(options).then((data: Array<Categories>) => {
          const dataToReturn = new ResponseStructure('success', data);
          console.log(data);
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

}
