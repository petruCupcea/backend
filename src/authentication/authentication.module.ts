import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SharedModule } from '../shared';
import { Users } from '../shared/entities';
import { CreateUsers, ReadUsers } from './services';


@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    SharedModule,
  ],
  providers: [
    CreateUsers,
    ReadUsers,
  ],
})
export class AuthenticationModule {
}
