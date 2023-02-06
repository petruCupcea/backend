import { Body, Controller, Get, Header, HttpCode, Post } from '@nestjs/common';
import { OperationsService, RequestStructure, ResponseStructure } from "./shared";


@Controller()
export class AppController {
  constructor(private readonly operationsService: OperationsService) {
  }


  @Post('/json_processor')
  @HttpCode(200)
  @Header('Content-Type', 'application/json;charset=UTF-8')
  jsonProcessor(@Body() body: RequestStructure): Promise<ResponseStructure> {
    const validateData = this.validateRequestData(body);
    if (!validateData.isValid) {
      return new Promise<ResponseStructure>((resolve) => {
        resolve(validateData.errorResponse);
      });
    }

    return this.operationsService.callOperation(body);
  }


  private validateRequestData(data: RequestStructure): {isValid: boolean; errorResponse?: ResponseStructure} {
    const validation = {
      isValid: true,
      errorResponse: undefined,
    }
    if (!data.operation) {
      validation.isValid = false;
      validation.errorResponse = new ResponseStructure('success', {message: 'Operation field missing from input data!'});
    }

    return validation;
  }

}
