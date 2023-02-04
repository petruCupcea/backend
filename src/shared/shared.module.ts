import { Module } from '@nestjs/common';

import { OperationsService } from './services';


@Module({
  imports: [],
  controllers: [],
  providers: [
    OperationsService,
  ],
  exports: [
    OperationsService,
  ],
})
export class SharedModule {
}
