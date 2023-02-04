import { Injectable } from '@nestjs/common';

import { RequestStructure, ResponseStructure } from '../structures';


@Injectable()
export class OperationsService {

  private readonly operations: {[key: string]: (data: RequestStructure) => Promise<ResponseStructure>};


  constructor() {
    this.operations = {};
  }


  registerOperation(name: string, fn: (data: RequestStructure) => Promise<ResponseStructure>) {
    if (this.operations[name]) {
      throw `Operation with name "${name}" already defined!`;
    }
    this.operations[name] = fn;
  }


  callOperation(data: RequestStructure): Promise<ResponseStructure> {
    const operationFn = this.operations[data.operation];
    if (!operationFn) {
      throw `Operation "${data.operation}" not defined!`;
    }

    return operationFn(data);
  }

}
